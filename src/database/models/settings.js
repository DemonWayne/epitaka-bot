'use strict';

const { model, Schema } = require('mongoose');

const SettingSchema = new Schema(
  {
    guild: { type: String, required: true },
    moderation: {
      allowedCommands: { type: [String] },
      headModRoles: { type: [String] },
      modRoles: { type: [String] },
    },
    logs: {
      mod: { type: String },
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = model('Setting', SettingSchema);
