// api/invite.js
import data from '../data.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { guildId, inviterId, invitedId } = req.body;

  if (!guildId || !inviterId || !invitedId)
    return res.status(400).json({ error: 'Missing data' });

  if (!data[guildId]) data[guildId] = {};
  if (!data[guildId][inviterId])
    data[guildId][inviterId] = { invites: 0, invited: [] };

  data[guildId][inviterId].invites++;
  data[guildId][inviterId].invited.push(invitedId);

  return res.json({ success: true, inviter: inviterId, invited: invitedId });
}
