'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../../../lib/supabase';

interface FormData {
  name: string;
  email: string;
  password: string;
  location: string;
  experienceLevel: string;
  profile_picture_url: string;
  interests: string;
  bio: string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    location: '',
    experienceLevel: '',
    profile_picture_url: '',
    interests: '',
    bio: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (formData: FormData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      console.log('Sign-up successful');

      const user = data.user;

      if (user) {
        // Insert the user's profile
        const { error: profileError } = await supabase
          .from('profile')
          .insert([
            {
              id: user.id, // Use the user ID from the signed-up user
              email: formData.email,
              name: formData.name,
              location: formData.location,
              interests: formData.interests,
              experience_level: formData.experienceLevel,
              profile_picture_url: formData.profile_picture_url,
              bio: formData.bio,
              role: 'user',
            },
          ]);

        if (profileError) {
          console.error('Profile sync error:', profileError.message);
          throw profileError;
        } else {
          console.log('Profile successfully synced!');
          setSuccess(true);
        }
      } else {
        throw new Error('User signup successful but user data is not available');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      setError((error as Error).message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    await handleSignUp(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Let's get Synced!</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Sign up successful!</p>}
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="experienceLevel" placeholder="Experience Level" value={formData.experienceLevel} onChange={handleChange} />
        <input type="text" name="interests" placeholder="Interests (comma separated)" value={formData.interests} onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
