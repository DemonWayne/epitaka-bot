'use strict';

const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
  run(interaction) {
    if (interaction.isButton()) {
      require('../handlers/rolesbybutton').handleClick(interaction);
    }
  }
};
