import { useState } from 'react'
import AgoraUIKit from "agora-react-uikit";


import React from 'react'

const VideoCall = () => {
  const [videoCall, setVideoCall] = useState(true);

  //imported ui kit
  //set state
  //set rtcProps, pass to comp
  // set callbacks 

 const rtcProps = {
    appId: "57a1687302b04f4289fc9229cc53797f",
    channel: "scriptsync",
    token: "007eJxTYFjgd9FGgG+XTN6iPXnS7qKORaGq+2bekQtMZ37UdFRa9YsCg6l5oqGZhbmxgVGSgUmaiZGFZVqypZGRZXKyqbG5pXna1LSdaQ2BjAzzU28yMzJAIIjPxVCcXJRZUFJcmZfMwAAAIcwfig==",

};

//
const callbacks = {
  EndCall: () => setVideoCall(false),
};


  return (
    <div>
      {
       videoCall ? (
         <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
           <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
         </div>
       ) : (
         <h3 onClick={() => setVideoCall(true)}>Sync Now!</h3>
       )
      }
      </div>
     )
  
}

export default VideoCall
