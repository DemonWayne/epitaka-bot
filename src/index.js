'use strict';

const { SapphireClient } = require('@sapphire/framework');
require('dotenv').config();
require('@sapphire/plugin-logger/register');

const client = new SapphireClient({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'],
  partials: ['GUILD_MEMBER', 'MESSAGE'],
  devs: ['481344295354368020', '373206800196960268', '503153801235267584'],
  defaultPrefix: '/',
  disableMentionPrefix: true,
  restSweepInterval: 120,
});

client.login(process.env.DISCORD_TOKEN);
