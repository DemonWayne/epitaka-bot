'use strict';

const { Precondition } = require('@sapphire/framework');
const { sendErrorMessage } = require('../utils');
const Client = require('../database/models/client');

module.exports = class extends Precondition {
  async run(message, command) {
    const client = await Client.findOne({ clientId: this.container.client.id });
    if (!client) return true;
    const { devs } = client;
    return devs.includes(message.author.id)
      ? this.ok()
      : this.error(
          message.delete(),
          sendErrorMessage({
            message,
            content: 'Данная команда доступна только разработчикам!',
            member: message.member,
          }),
          this.container.logger.info(
            `[Message] ${message.author.tag} попытался использовать команду для разработчиков ${command.name} ${
              message.guild
                ? `на сервере ${message.guild.name} в канале ${message.channel.name}`
                : `в личных сообщениях`
            }`,
          ),
        );
  }
};
