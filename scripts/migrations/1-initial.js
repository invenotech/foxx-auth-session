'use strict';

/**
 * Initial Collection Setup
 */
const { db } = require('@arangodb');

if (!db._collection('sessions')) {
  db._createDocumentCollection('sessions');
}

module.exports = true;
