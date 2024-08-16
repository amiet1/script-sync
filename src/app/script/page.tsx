"use client";

import { useState, useEffect } from "react";

interface Script {
  title: string;
  author: string;
  genre:string;
  content: string;
  id: string;
 
}
export const fakeScripts = [
  {
    title: "The Enchanted Forest",
    id: '1',
    author: "Jane Doe",
    genre: "Fantasy",
    content: `
      Scene 1: The Mysterious Woods
      [A young girl, Lily, walks cautiously through a dense forest. Strange sounds echo around her.]
      Lily: (whispers) Where am I?
      [A faint glow appears in the distance, and she follows it.]
    `
  },
  {
    title: "Undercover Agent",
    id: '2',
    author: "John Smith",
    genre: "Action/Thriller",
    content: `
      Scene 5: The Daring Escape
      [Agent Ryan is handcuffed to a chair in a dimly lit room. He notices a loose bolt on the armrest.]
      Ryan: (thinking) This is my chance.
      [He uses the bolt to pick the lock on the handcuffs and quietly moves toward the exit.]
    `
  },
  {
    title: "Love in Paris",
    id: '3',
    author: "Emily Johnson",
    genre: "Romance",
    content: `
      Scene 3: The Café Encounter
      [Emma sits alone at a café, sipping her coffee. A handsome stranger, Alex, walks in and accidentally spills his drink.]
      Alex: (embarrassed) Oh, I'm so sorry!
      Emma: (smiling) It's alright. How about I buy you another one?
    `
  },
  {
    title: "The Last Frontier",
    id: '4',
    author: "Michael Brown",
    genre: "Sci-Fi",
    content: `
      Scene 7: The Final Stand
      [Captain Harper and her crew prepare to face an alien invasion on their ship.]
      Harper: (determined) We fight for our home, for our people. This is where we make our stand!
      [The crew rallies around her as the alien ships approach.]
    `
  },
  {
    title: "The Haunted Mansion",
    id: '5',
    author: "Emily Carter",
    genre: "Horror",
    content: `
      Scene 2: The Creaking Attic
      [A flashlight beam cuts through the darkness. Sarah, a young woman, cautiously explores the attic.]
      Sarah: (whispers) Hello? Is anyone there?
      [A sudden crash echoes through the room.]
    `
  },
  {
    title: "The Tech Tycoon",
    id: '6',
    author: "Daniel Lee",
    genre: "Drama",
    content: `
      Scene 4: The Boardroom Meeting
      [Alex, the CEO, addresses a tense board meeting.]
      Alex: We face a critical decision. Do we downsize or innovate?
      [A heated debate ensues among the board members.]
    `
  },
  {
    title: "The Star-Crossed Lovers",
    id: '7',
    author: "Olivia Walker",
    genre: "Romance",
    content: `
      Scene 1: The Grand Ball
      [A glittering ballroom filled with elegantly dressed guests. Sophia and Ethan lock eyes across the crowded room.]
      Sophia: (to her friend) He's so handsome.
      [Ethan approaches Sophia with a confident smile.]
    `
  },
  {
    title: "The Time Traveler's Dilemma",
    id: '8',
    author: "William Harris",
    genre: "Sci-Fi",
    content: `
      Scene 3: The Paradox
      [Dr. Evelyn Carter sits in her lab, surrounded by futuristic equipment.]
      Evelyn: (muttering) If I change the past, will it affect the future?
      [A sudden power surge causes a malfunction in the time machine.]
    `
  },
  {
    title: "The Culinary Competition",
    id: '9',
    author: "Mia Rodriguez",
    genre: "Drama/Comedy",
    content: `
      Scene 2: The Final Challenge
      [The two finalists, Alex and Riley, stand side by side in the kitchen.]
      Host: You have one hour to create a dish that represents your culinary journey.
      [The clock starts ticking as the chefs begin to prepare their dishes.]
    `
  }
];



const ScriptList = () => {
  const [scripts, setScripts] = useState<Script[]>(fakeScripts);

  
  useEffect(() => {
    const getScripts = async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`

          },
          body: JSON.stringify({model: 'gpt-3.5-turbo-1106', messages: ['what is new york?']}),
        });
        const data = await response.json();
        console.log(data)
        // setScripts([]);
      } catch (error) {
        console.error("Failed to fetch scripts!");
      }
    };

    getScripts();
  }, []);

  return (
    /**title: "The Last Frontier",
      author: "Michael Brown",
      genre: "Sci-Fi",
      content:  */
    <div>
      <main className="bg-black h-screen flex items-center justify-center">
      <div className="script-container grid grid-cols-3 gap-4">
        {fakeScripts.map((script) => (
          <div
            key={script.title}
            className="script-card bg-white border border-black hover:border-green-500 p-4 rounded-md cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-2">{script.title}</h3>
            <ul className="list-disc space-y-2">
              <li>{script.author}</li>
              <li>{script.genre}</li>
              <p>{script.content}</p>
            </ul>
          </div>
        ))}
      </div>
    </main>
    </div>
  );
};

export default ScriptList;