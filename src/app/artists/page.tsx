'use client';
import React, { useState, useEffect } from 'react';
import supabase from '../../../lib/supabase';
import ScriptPracticeRequestForm from '../requestForm/page';

const Artists = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('Profile').select('*');

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

  const handleConnect = (userId: any) => {
    console.log(userId);
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 font-extrabold p-8">
      <h1 className="text-3xl text-center text-black mb-8">User List</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {users.map((user: any) => (
          <div key={user.id} className="flex justify-between items-center mb-4 p-4 border-b border-gray-300">
            <p className="text-black text-lg">{user.name}</p>
            {/* /store image url {user.profile_picture_url} */}
            <p>{user.role}{user.experience_level}</p>
            <button
              onClick={() => handleConnect(user.id)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              Connect
            </button>
          </div>
        ))}
        {selectedUser && (
          <div>
            <button onClick={handleBackToList}>Back to List</button>
            <ScriptPracticeRequestForm user={selectedUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
