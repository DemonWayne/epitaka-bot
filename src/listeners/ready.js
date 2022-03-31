'use strict';

const { Listener } = require('@sapphire/framework');
const ClientSchema = require('../database/models/client');

module.exports = class extends Listener {
  async run(client) {
    const { tag, id } = client.user;
    this.container.logger.info(`Бот авторизован как ${tag}`);
    require('../database/connect').connect();

    const clientData = await ClientSchema.findOne({ clientId: id });
    if (!clientData) {
      await ClientSchema.create({
        clientId: id,
        devs: this.container.client.options.devs,
        version: '1.0.0',
      });
    }
  }
};
