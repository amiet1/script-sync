'use client'

import React, { useEffect, useRef } from 'react';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-sdk-ng';

const VideoCall = ({ channel }) => {
  const client = useRef(null);
  const localTracks = useRef({ videoTrack: null, audioTrack: null });
  const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;
  const TOKEN = null; // Use a token server to generate a token if required

  useEffect(() => {
    const init = async () => {
      client.current = createClient({ mode: 'rtc', codec: 'vp8' });

      await client.current.join(APP_ID, channel, TOKEN, null);

      const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();
      localTracks.current.videoTrack = cameraTrack;
      localTracks.current.audioTrack = microphoneTrack;

      await client.current.publish([localTracks.current.videoTrack, localTracks.current.audioTrack]);

      const localVideoContainer = document.getElementById('local-video');
      localTracks.current.videoTrack.play(localVideoContainer);
    };

    init();

    return () => {
      localTracks.current.videoTrack.close();
      localTracks.current.audioTrack.close();
      client.current.leave();
    };
  }, [channel]);

  return (
    <div>
      <div id="local-video" style={{ width: '640px', height: '480px' }}></div>
    </div>
  );
};

export default VideoCall;
