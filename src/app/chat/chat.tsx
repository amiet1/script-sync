// 'use client'

// import React, { useState, useEffect } from 'react';
// import AC from 'agora-chat';

// const AppID = process.env.NEXT_PUBLIC_AGORA_APP_ID; // Access App ID from environment variable

// function Chat() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userID, setUserID] = useState('');
//   const [token, setToken] = useState('');
//   const [chatLog, setChatLog] = useState([]);
//   const [chatClient, setChatClient] = useState(null);

//   useEffect(() => {
//     // Initialize chat client on component mount
//     const initChatClient = async () => {
//       const newClient = new AC.connection({ appKey: AppID });
//       setChatClient(newClient);

//       const handleLogin = async () => {
//         try {
//           await newClient.open({ user: userID, agoraToken: token });
//           setIsLoggedIn(true);
//           setChatLog((prevLog) => [...prevLog, 'Connected to Agora Chat']);
//         } catch (error) {
//           console.error('Error logging in:', error);
//           setChatLog((prevLog) => [...prevLog, 'Login failed']);
//         }
//       };

//       const handleLogout = async () => {
//         await newClient.close();
//         setIsLoggedIn(false);
//         setChatLog((prevLog) => [...prevLog, 'Disconnected from Agora Chat']);
//       };

//       const handleMessage = (message) => {
//         setChatLog((prevLog) => [
//           ...prevLog,
//           `Message from: ${message.from}, Text: ${message.msg}`,
//         ]);
//       };

//       newClient.addEventHandler('message', handleMessage);

//       // ... other event handlers for connection status, etc.

//       return () => {
//         newClient.removeEventHandler('message', handleMessage);
//         newClient.close(); // Clean up chat client on unmount
//       };
//     };

//     initChatClient(); // Call on initial render
//   }, []);

//   const handleSendMessage = (peerID, message) => {
//     if (chatClient) {
//       const chatMessage = AC.message.create({
//         chatType: 'singleChat',
//         type: 'txt',
//         to: peerID,
//         msg: message,
//       });

//       chatClient
//         .send(chatMessage)
//         .then(() => {
//           setChatLog((prevLog) => [...prevLog, `Sent message to: ${peerID}`]);
//         })
//         .catch((error) => {
//           console.error('Error sending message:', error);
//           setChatLog((prevLog) => [...prevLog, 'Failed to send message']);
//         });
//     } else {
//       console.error('Chat client not initialized');
//     }
//   };

//   return (
//     <div>
//       {/* Login/Logout buttons (conditionally rendered based on isLoggedIn) */}
//       {isLoggedIn ? (
//         <button onClick={() => handleLogout()}>Logout</button>
//       ) : (
//         <>
//           <input
//             type="text"
//             placeholder="User ID"
//             value={userID}
//             onChange={(e) => setUserID(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Token"
//             value={token}
//             onChange={(e) => setToken(e.target.value)}
//           />
//           <button onClick={() => handleLogin()}>Login</button>
//         </>
//       )}
//       {/* Chat input and display with chatLog */}
//       <input
//         type="text"
//         placeholder="Enter message"
//         disabled={!isLoggedIn}
//         // ... handle message input
//       />
//       <ul>
//         {chatLog.map((message, index) => (
//           <li key={index}>{message}</li>
//         ))}
//       </ul>
//       {/* Send message button (disabled if not logged in) */}
//       <button onClick={() => handleSendMessage('peerID', 'message')} disabled={!isLoggedIn}>
//         Send Message
//       </button>
//     </div>
//   );
// }

// export default Chat;
