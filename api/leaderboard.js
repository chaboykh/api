// api/leaderboard.js
import data from '../data.js';

export default function handler(req, res) {
  const { guildId } = req.query;
  if (!guildId) return res.status(400).json({ error: 'Missing guildId' });

  const guildData = data[guildId] || {};

  const leaderboard = Object.entries(guildData)
    .map(([userId, info]) => ({
      userId,
      invites: info.invites,
    }))
    .sort((a, b) => b.invites - a.invites);

  res.json(leaderboard);
}
