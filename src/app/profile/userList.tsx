//Fetches the logged-in user's ID using Supabase auth.
// Fetches the logged-in user's profile.
// Provides a function to fetch other user profiles.
// Renders the UserProfile component with the fetched data.

'use client'
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import  supabase  from '../../../lib/supabase';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('Profile')
          .select('*');

        if (error) {
          console.error('Error fetching users:', error);
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleConnect (userId: any) => {
   setSelectedUser(userId)
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <UserProfile userId={user.id} />
          <button onClick={() => handleConnect(user.id)}>Connect</button>
        </div>
        //direct using chat ui 
      ))}
    </div>
  );
};

export default UserList;
