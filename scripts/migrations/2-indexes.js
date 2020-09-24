'use strict';

/**
 * Initial Collection Setup
 */
const { db } = require('@arangodb');

const sessions = db._collection('sessions');

sessions.ensureIndex({
  type: 'hash',
  unique: false,
  fields: ['uid']
});

sessions.ensureIndex({
  type: 'hash',
  unique: false,
  fields: ['expires']
});

module.exports = true;
