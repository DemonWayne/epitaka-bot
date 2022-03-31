'use strict';

const { Precondition } = require('@sapphire/framework');
const { sendErrorMessage } = require('../utils');
const settingsSchema = require('../database/models/settings');

module.exports = class extends Precondition {
  async run(message, command) {
    const settings = await settingsSchema.findOne({ guild: message.guild.id });
    const { allowedCommands } = settings.moderation;
    return allowedCommands.includes(command.name)
      ? this.ok()
      : this.error(
          message.delete(),
          sendErrorMessage({
            message,
            content: 'Данная команда отключена на данном сервере!',
            member: message.member,
          }),
        );
  }
};
