const PresenceService = require('./core/083-Social-Presence-Typing.service');
const PresenceSocket = require('./083-Social-Presence-Typing.socket');

module.exports = {
    service: PresenceService,
    socket: PresenceSocket
};