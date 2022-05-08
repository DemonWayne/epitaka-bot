'use strict';

const { SapphireClient } = require('@sapphire/framework');
const { DISCORD_TOKEN } = require('dotenv').config();
require('@sapphire/plugin-logger/register');

const client = new SapphireClient({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES'],
  partials: ['GUILD_MEMBER', 'MESSAGE'],
  defaultPrefix: '/',
  disableMentionPrefix: true,
  restSweepInterval: 120,
});

client.login(DISCORD_TOKEN);
