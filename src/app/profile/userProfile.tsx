import React, { useState, useEffect} from 'react'
import supabase from '../../../lib/supabase';

//*NEEDS AUTH TO CHECK LOOGEDIN USER


const UserProfile = () => {
  const [profileData, setProfileData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(()=> {
    const fetchUserPro = async () => {
      try {
        setIsLoading(true);
        const {data, error : any} = await supabase.auth.getUser()
    
        if(error){
          setError(error)
        } else {
          setProfileData(data.user)
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
  }, []);


  if (isLoading) {
    return <p>Loading profile...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!profileData) {
    return <p>No profile found for this user.</p>;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error);
  };
  
  const {name, email, location, interests, experience_level, profile_picture_url, bio, role} = profileData;
  console.log(name, email)
  return (
    (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 text-white p-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center">
        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          {profile_picture_url && (
            <img
              src={profile_picture_url}
              alt={`${name}'s profile picture`}
              className="w-48 h-48 rounded-full border-4 border-white"
            />
          )}
        </div>

        {/* User Info */}
        <h1 className="text-5xl font-bold mb-6">{name}</h1>
        <p className="text-lg mb-2">
          <span className="font-bold">Email:</span> {email}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Location:</span> {location || 'N/A'}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Interests:</span> {interests || 'N/A'}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Experience Level:</span> {experience_level || 'N/A'}
        </p>
        <p className="text-lg mb-4">
          <span className="font-bold">Bio:</span> {bio || 'N/A'}
        </p>
        {role && (
          <p className="text-lg mb-4">
            <span className="font-bold">Role:</span> {role}
          </p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
    )
  )
}

export default UserProfile;

// Takes a userId prop as input.
// Fetches profile data based on the provided userId.
// Handles loading, error, and data states.