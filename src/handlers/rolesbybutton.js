/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable newline-per-chained-call */
'use strict';

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { rbb } = require('../data');

exports.checkMessages = async client => {
  for await (const [guild_id, { channel: channel_id, buttons }] of Object.entries(rbb)) {
    if (!guild_id || !channel_id || !buttons) return console.error(`[RBB] Нет настроек для сервера ${guild_id}!`);
    const guild = client.guilds.cache.get(guild_id);
    if (!guild) return console.error('[RBB] Сервер не найден');

    let channel = guild.channels.cache.get(channel_id);
    if (!channel) return console.error('[RBB] Канал не найден');

    const messages = await channel.messages.fetch({ limit: 2 });
    if (
      !messages.size ||
      messages.first().author.id !== client.user.id ||
      messages.last().author.id !== client.user.id
    ) {
      try {
        await channel.bulkDelete(100);
      } catch (err) {
        await channel.delete();
        await channel.clone().then(ch => (channel = ch));
      }
    } else if (messages.first().author.id === client.user.id && messages.last().author.id === client.user.id) {
      return true;
    }

    const description = [];
    const components = [];
    for (const [customId, { emoji, label, style, role }] of Object.entries(buttons)) {
      if (components.length === 5) break;
      description.push(`Нажмите ${emoji} ${label ?? ''}, чтобы получить роль <@&${role}>`);
      components.push(
        new MessageButton()
          .setCustomId(customId)
          .setEmoji(emoji ?? '🎮')
          .setLabel(label ?? '')
          .setStyle(style ?? 'PRIMARY'),
      );
    }
    await channel.send({
      embeds: [
        new MessageEmbed()
          .setColor(0x1de05b)
          .setDescription(`На вашем Dualsence есть выбор!\n\n${description.join('\n\n')}`),
      ],
      components: [new MessageActionRow().addComponents(...components)],
    });
  }

  return true;
};

exports.handleClick = interaction => {
  if (interaction.replied) return;
  const guildData = rbb[interaction.guild.id];

  for (const [customId, { role: role_id }] of Object.entries(guildData.buttons)) {
    if (interaction.customId === customId) {
      const role = interaction.guild.roles.cache.get(role_id);
      if (interaction.member.roles.cache.has(role_id)) {
        interaction.member.roles.remove(role_id);
        interaction.reply({ content: `Роль ${role.name} снята!`, ephemeral: true });
      } else {
        interaction.member.roles.add(role_id);
        interaction.reply({ content: `Роль ${role.name} выдана!`, ephemeral: true });
      }
    }
  }
};
