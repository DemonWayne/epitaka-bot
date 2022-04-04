/* eslint-disable newline-per-chained-call */
'use strict';

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

exports.checkMessages = async client => {
  const guild = client.guilds.cache.get('957401630947561512');
  if (!guild) return console.error('[RBB] Сервер не найден');

  const channel = guild.channels.cache.get('960668949236809810');
  if (!channel) return console.error('[RBB] Канал не найден');

  const messages = await channel.messages.fetch({ limit: 2 });
  if (!messages.size || messages.first().author.id !== client.user.id || messages.last().author.id !== client.user.id) {
    await channel.bulkDelete(100);
  } else if (messages.first().author.id === client.user.id && messages.last().author.id === client.user.id) {
    return true;
  }

  await channel.send({
    embeds: [
      new MessageEmbed()
        .setColor(0x1de05b)
        .setTitle('Здесь вы можете получить/снять себе роль.')
        .setDescription('Нажмите на кнопку **X** на вашем Dualsence чтобы получить роль <@&957404673378246727>'),
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton().setCustomId('gey_mer').setStyle('PRIMARY').setEmoji('🇽'),
      ),
    ],
  });

  await channel.send({
    embeds: [
      new MessageEmbed().setColor(0x1de05b).setDescription(
        // eslint-disable-next-line max-len
        'На вашем Dualsence есть выбор!\n\nНажмите 🇽 + 🔼 — получить роль <@&960675239090606112>\n\nНажмите 🇽 + ◀️ — получить роль <@&960675233461833738>\n\nНажмите 🇽 + 🔽 — получить роль <@&960675233403117668>',
      ),
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton().setCustomId('kser').setEmoji('🇽').setLabel('+ 🔼').setStyle('PRIMARY'),
        new MessageButton().setCustomId('doter').setEmoji('🇽').setLabel('+ ◀️').setStyle('PRIMARY'),
        new MessageButton().setCustomId('maincampf').setEmoji('🇽').setLabel('+ 🔽').setStyle('PRIMARY'),
      ),
    ],
  });

  return true;
};

// TODO Рефакторинг части ниже

exports.handleClick = interaction => {
  if (interaction.customId === 'gey_mer') {
    if (interaction.member.roles.cache.has('957404673378246727')) {
      interaction.member.roles.remove('957404673378246727');
      interaction.reply({ content: 'Роль гей мер снята!', ephemeral: true });
    } else {
      interaction.member.roles.add('957404673378246727');
      interaction.reply({ content: 'Роль гей мер выдана!', ephemeral: true });
    }
  } else if (interaction.customId === 'kser') {
    if (interaction.member.roles.cache.has('960675239090606112')) {
      interaction.member.roles.remove('960675239090606112');
      interaction.reply({ content: 'Роль ксер снята!', ephemeral: true });
    } else {
      interaction.member.roles.add('960675239090606112');
      interaction.reply({ content: 'Роль ксер выдана!', ephemeral: true });
    }
  } else if (interaction.customId === 'doter') {
    if (interaction.member.roles.cache.has('960675233461833738')) {
      interaction.member.roles.remove('960675233461833738');
      interaction.reply({ content: 'Роль дотер снята!', ephemeral: true });
    } else {
      interaction.member.roles.add('960675233461833738');
      interaction.reply({ content: 'Роль дотер выдана!', ephemeral: true });
    }
  } else if (interaction.customId === 'maincampf') {
    if (interaction.member.roles.cache.has('960675233403117668')) {
      interaction.member.roles.remove('960675233403117668');
      interaction.reply({ content: 'Роль майна снята!', ephemeral: true });
    } else {
      interaction.member.roles.add('960675233403117668');
      interaction.reply({ content: 'Роль майна выдана!', ephemeral: true });
    }
  }
};
