'use strict';

const { MessageEmbed } = require('discord.js');

exports.sendErrorMessage = ({ message, content, member }) => {
  const { user } = message.client;
  message.channel
    .send({
      embeds: [
        new MessageEmbed()
          .setColor(0xeb4034)
          .setTitle(`**🚫 | Произошла ошибка**`)
          .setDescription(`**${member}, ${content}**`)
          .setFooter({ text: `${user.username} | Ошибка`, iconURL: message.client.user.displayAvatarURL() }),
      ],
    })
    .then(msg => setTimeout(() => msg.delete(), 15 * 1000));
};
