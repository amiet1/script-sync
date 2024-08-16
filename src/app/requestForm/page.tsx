'use client'

import React, { useState } from 'react';
import { fakeScripts } from '../script/page';
import supabase from '../../../lib/supabase';

interface ScriptRequestProp {
    user: any;
}

const ScriptPracticeRequestForm: React.FC<ScriptRequestProp> = ({ user }) => {
  
  const [selectedScript, setSelectedScript] = useState(fakeScripts[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData: any = {
      user_id: user.id, 
      script_id: selectedScript,
      date,
      time,
      notes,
      approved: false,
    };
    console.log("Request Submitted:", requestData);
    
    const { data, error } = await supabase.from('ScriptPracticeRequests').insert([requestData]);
        if (error) console.error('Error submitting request:', error);
        else console.log('Request Submitted:', data);
  };


  

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-gray-100 text-gray-900" // Updated classes
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Script Practice Session</h2>

      <div className="mb-6">
        <label className="block text-lg mb-2">Select Script:</label>
        <select 
          value={selectedScript}
          onChange={(e) => setSelectedScript(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-300 border-none rounded-lg text-gray-900 hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          {fakeScripts.map((script) => (
            <option key={script.id} value={script.id}>  {/* Added value attribute */}
              {script.title} - {script.author} ({script.genre})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-lg mb-2">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-300 border-none rounded-lg text-gray-900 hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg mb-2">Select Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-300 border-none rounded-lg text-gray-900 hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg mb-2">Additional Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 mt-2 bg-gray-300 border-none rounded-lg text-gray-900 hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          rows={4}
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-gray-500 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 text-lg font-semibold"
      >
        Submit Request
      </button>
    </form>
  );
};

export default ScriptPracticeRequestForm;