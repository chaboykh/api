const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let inviteData = {}; // { guildId: { userId: { invites: 0, invited: [] } } }

app.use(express.json());

app.post("/invite", (req, res) => {
  const { guildId, inviterId, invitedId } = req.body;
  if (!inviteData[guildId]) inviteData[guildId] = {};
  if (!inviteData[guildId][inviterId]) inviteData[guildId][inviterId] = { invites: 0, invited: [] };

  inviteData[guildId][inviterId].invites++;
  inviteData[guildId][inviterId].invited.push(invitedId);
  res.json({ success: true });
});

app.get("/leaderboard/:guildId", (req, res) => {
  const guildId = req.params.guildId;
  if (!inviteData[guildId]) return res.json([]);
  const leaderboard = Object.entries(inviteData[guildId])
    .map(([userId, data]) => ({ userId, invites: data.invites }))
    .sort((a, b) => b.invites - a.invites);
  res.json(leaderboard);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
