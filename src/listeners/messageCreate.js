'use strict';

const { Listener } = require('@sapphire/framework');
const settingsSchema = require('../database/models/settings');

module.exports = class extends Listener {
  async run(message) {
    const guildData = await settingsSchema.findOne({ guild: message.guild.id });
    if (!guildData) {
      await settingsSchema.create({ guild: message.guild.id });
    }
  }
};
