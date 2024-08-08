'use client'

import React, { useState } from 'react';
import VideoCall from './videoCall.js'

const Video = () => {
  const [inCall, setInCall] = useState(false);
  const [channel, setChannel] = useState('');

  const handleJoin = () => {
    if (channel) {
      setInCall(true);
    }
  };

  return (
    <div>
      {!inCall ? (
        <div>
          <h1>Join a Channel</h1>
          <input
            type="text"
            placeholder="Enter Channel Name"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <VideoCall channel={channel} />
      )}
    </div>
  );
};

export default Video;
