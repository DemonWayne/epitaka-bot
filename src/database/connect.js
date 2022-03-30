'use strict';

const { Logger } = require('@sapphire/plugin-logger');

exports.connect = () => {
  const Log = new Logger();
  require('dotenv').config();
  const mongoose = require('mongoose');
  const autoIncrement = require('mongoose-auto-increment');

  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) throw err;
      Log.info('[Database] База данных Mongo успешно подключена.');
    },
  );
  autoIncrement.initialize(mongoose.connection);
};
