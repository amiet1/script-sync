
import React, { useState, useEffect} from 'react'
import supabase from '../../../lib/supabase';

interface UserProfileProps {
  userId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({userId = 'defaultUserId'}) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(()=> {
    const fetchUserPro = async () => {
      try {
        setIsLoading(true);
        const {data,error : any} = await supabase
        .from ('Profile')
        .select ('*')
        .eq ('id',userId)
        .single();

        if(error){
          setError(error)
        } else {
          setProfileData(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error);//! passed in here
        //setError(error);
        //!commented out because type error
      
      } finally {
        setIsLoading(false)
      }
    };
    fetchUserPro()
  }, [userId]);



  if (isLoading) {
    return <p>Loading profile...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!profileData) {
    return <p>No profile found for this user.</p>;
  }

  const {name, email, location, interests, experience_level, profile_picture_url, bio, role} = profileData;
  console.log(name, email)
  return (
       <div className="user-profile">
      {profile_picture_url && (
        <img src={profile_picture_url} alt={`${name}'s profile picture`} />
      )}
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Location: {location || 'N/A'}</p>
      {/* <p>Interests: {interests?.join(', ') || 'N/A'}</p>        */}
      <p>Interests: {interests || 'N/A'}</p>
      <p>Experience Level: {experience_level || 'N/A'}</p>
      <p>Bio: {bio || 'N/A'}</p>
      {role && <p>Role: {role}</p>}
    </div>
  
  )
}

export default UserProfile;

// Takes a userId prop as input.
// Fetches profile data based on the provided userId.
// Handles loading, error, and data states.