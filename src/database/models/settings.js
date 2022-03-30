'use strict';

const { model, Schema } = require('mongoose');

const GuildSchema = new Schema(
  {
    guild: { type: String, required: true },
    moderation: {
      // Available commands
      allowedCommands: { type: [String] },
      headModRoles: { type: [String] },
      modRoles: { type: [String] },
    },
    logs: {
      sup_logChannel: { type: String },
      mod_logChannel: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

module.exports = model('Guild', GuildSchema);
