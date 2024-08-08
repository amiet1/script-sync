'use client';

import { useState, useEffect } from 'react';

interface Script {
  title: string;
  link: string;
}

const ScriptList = () => {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    const getScripts = async () => {
      try {
        const response = await fetch("/api/scripts");
        const data: Script[] = await response.json();
        setScripts(data);
      } catch (error) {
        console.error('Failed to fetch scripts!');
      }
    };

    getScripts();
  }, []);

  return (
    <div>
      <h1>All Scripts</h1>
      <ul>
        {scripts.map((script, index) => (
          <li key={index}>
            <a href={script.link}>{script.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScriptList;
