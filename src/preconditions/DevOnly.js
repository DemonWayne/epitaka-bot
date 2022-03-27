'use strict';

const { Precondition } = require('@sapphire/framework');
const { sendErrorMessage } = require('../utils');

module.exports = class extends Precondition {
  run(message, command) {
    const devs = this.container.client.options.devs;
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
