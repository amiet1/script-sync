import React from 'react'
import Link from 'next/link'


const NavBar = () => {

  return (
    <nav className="bg-gradient-to-r from-green-400 to-green-600 p-4 shadow-lg">
      <div className="container mx-auto">
        <ul className="flex justify-around">
          <li className='text-white font-bold text-lg'>
            <Link href='/' className="px-4 py-2 rounded hover:bg-green-700 hover:shadow-md transition duration-300">
              Home</Link>
          </li>
          <li className="text-white font-bold text-lg">
            <Link href="/profile" className="px-4 py-2 rounded hover:bg-green-700 hover:shadow-md transition duration-300">
              Your Profile
            </Link>
          </li>
          <li className="text-white font-bold text-lg">
            <Link href="/script" className="px-4 py-2 rounded hover:bg-green-700 hover:shadow-md transition duration-300">
              All Scripts
            </Link>
          </li>
          <li className="text-white font-bold text-lg">
            <Link href="/artists" className="px-4 py-2 rounded hover:bg-green-700 hover:shadow-md transition duration-300">
              Sync Artists
            </Link>
          </li>
          <li className='text-white font-bold text-lg'>
            <Link href='/dashboard' className="px-4 py-2 rounded hover:bg-green-700 hover:shadow-md transition duration-300">
              Dashboard</Link>
          </li>
        </ul>
        <div>
          <button>Log Out</button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
