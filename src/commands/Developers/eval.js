'use strict';

const { Command } = require('@sapphire/framework');

module.exports = class extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Выполнить код',
      preconditions: ['DevOnly'],
    });
  }

  async messageRun(message, args) {
    message.delete();
    const code = await args.rest('string').catch(() => false);
    if (!code) return;
    eval(code);
  }
};
