'use strict';

const { model, Schema } = require('mongoose');

const ClientSchema = new Schema(
  {
    clientId: { type: String },
    devs: { type: [String] },
    version: { type: String },
  },
  { versionKey: false, timestamps: true },
);

module.exports = model('Client', ClientSchema);
