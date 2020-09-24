"use strict";
const collectionStorage = require('@arangodb/foxx/sessions/storages/collection');
const headerTransport = require('@arangodb/foxx/sessions/transports/header');
const sessionsMiddleware = require("@arangodb/foxx/sessions");

const sessions = sessionsMiddleware({
  storage: collectionStorage({ collection: "sessions", ttl:  604800, pruneExpired: true, autoUpdate: false }),
  transport: headerTransport('BEARER')
});

module.exports = sessions;
