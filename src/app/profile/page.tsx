'use client'
import React from 'react'
import UserProfile from './userProfile';

const page = () => {
  //! User Id variable comes from the database
  //! extracted userProfile stored in an obj
  //! using that , we first fetched the users id and profile data
  //!caught any errors and recieved the userId
  //!passed a actual id into the userProfile as a prop to fetch users profile


  const tempId = 'ca63ed19-23f7-4c0f-8a63-714c842502e7';
//! fetch is based on the user thats logged in this will change, can be used dynamically
  return (
    <div>
      <UserProfile userId={tempId}/>
    </div>
  )
}

export default page
