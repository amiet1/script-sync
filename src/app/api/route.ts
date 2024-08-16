
const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const APP_ID = '57a1687302b04f4289fc9229cc53797f'; // Your Agora App ID
const APP_CERTIFICATE = 'fa7b7a42c10b4c6a870167ba353ec7fe'; // Your Agora App Certificate

app.post('/api/tokenVideoGen', (req:any, res:any) => {
  const channelName = req.body.channel;

  if (!channelName) {
    return res.status(400).json({ error: 'Channel name is required' });
  }

  const uid = 0; // Use 0 if you want to generate a token for an anonymous user
  const role = RtcRole.PUBLISHER;

  // Token validity: 1 hour
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTimestamp = currentTimestamp + expirationTimeInSeconds;

  // Build the token
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTimestamp
  );

  return res.json({ token });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



  // handles the request to generate a new Agora token.
  //get channel name 
//send channel name and get a token for the video 