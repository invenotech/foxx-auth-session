'use strict';

const { db } = require('@arangodb');

const migrations = module.context.dependencies.migrations;
const { name, version } = module.context.manifest;

const info = migrations.info(name);
const stages = {
  '1-initial': true,
  '2-indexes': true
};

/**
 * Setup Utility Functions
 */
function setup(name, version) {
  
  if (!db._collection('sessions')) {
    db._createDocumentCollection('sessions');
  }
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

  migrations.setup(name, version, stages);
}

function upgrade(name, installed) {
  let stage = {};

  switch (true) {
    case installed <= '0.2.3':
      const m2 = require('./migrations/2-indexes.js');
    default:
      break;
  }

  migrations.setup(name, version, stages);
}

/**
 * Migrations
 */
const preMigration = '0.2.3';

if (!info && !preMigration) {
  /**
   * Install the new version
   */
  setup(name, version);
} else {
  /**
   * Upgrade the old version
   */
  if (info) {
    upgrade(name, info.version);
  } else {
    upgrade(name, preMigration);
  }
}
