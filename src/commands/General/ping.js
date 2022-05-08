'use strict';

const { Command } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Пинг бота',
    });
  }

  async messageRun(message) {
    const msg = await message.channel.send({
      embeds: [new MessageEmbed().setColor('DARK_BUT_NOT_BLACK').setDescription('**Вычисление...**')],
    });

    const latency = Math.ceil(msg.createdTimestamp - message.createdTimestamp);
    const color = latency < 100 ? 0x00ff99 : latency < 250 ? 0x00cc66 : latency < 500 ? 0xff9900 : 0xcc0000;

    return msg.edit({
      embeds: [
        new MessageEmbed()
          .setColor(color)
          .setDescription(`**Пинг бота: \`${latency}ms\`\nAPI: \`${Math.round(this.container.client.ws.ping)}ms\`**`),
      ],
    });
  }
};
