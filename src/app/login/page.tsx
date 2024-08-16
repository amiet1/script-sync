
'use client'
import React, { useState } from 'react';
import supabase from '../../../lib/supabase';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
 
    const { data, error: any } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (!data) {
      setError(error);
    } else {
      console.log('User signed in:', data);
      //* useRouter user to their profile 
      //*redirect to dashboard
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 font-extrabold">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * The login form in the LoginPage component sends a POST request to the /api/login API route.
 * The API route processes the login request and returns a response.
 * The client-side component handles the response using handleSubmit and upadtes the client side and UI
 */