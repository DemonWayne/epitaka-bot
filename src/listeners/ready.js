'use strict';

const { Listener } = require('@sapphire/framework');

module.exports = class extends Listener {
  run(client) {
    const { tag } = client.user;
    this.container.logger.info(`Бот авторизован как ${tag}`);
    require('../database/connect').connect();
  }
};
