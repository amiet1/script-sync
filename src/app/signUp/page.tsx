'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../../../lib/supabase';

interface FormData {
  name: string;
  email: string;
  password: string;
  location: string;
  experience_level: string;
  profile_picture_url: string;
  interests: string;
  bio: string;
  role:string;
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    location: '',
    experience_level: '',
    profile_picture_url: '',
    interests: '',
    bio: '',
    role: '',
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
      console.log(user)
      
      if (user) {
        // Insert the user's profile
        const { error: profileError } = await supabase
          .from('Profile')
          .insert([
            {
              id: user.id, // Use the user ID from the signed-up user
              email: formData.email,
              name: formData.name,
              location: formData.location,
              interests: formData.interests,
              experience_level: formData.experience_level,
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Let's get Synced!</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">Sign up successful!</p>}
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="text"
            name="experience_level"
            placeholder="Experience Level"
            value={formData.experience_level}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <input
            type="text"
            name="interests"
            placeholder="Interests (comma separated)"
            value={formData.interests}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 hover:ring-2 hover:ring-green-400"
          />
          
          <button
            type="submit"
            className="w-full p-3  text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
