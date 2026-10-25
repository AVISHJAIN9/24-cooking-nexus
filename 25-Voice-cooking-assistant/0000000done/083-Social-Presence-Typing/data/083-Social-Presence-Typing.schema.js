class PresenceService {
    /**
     * @param {Object} io - The Socket.io instance
     * @param {String} userId - The user to show the animation to
     * @param {String} state - 'TYPING', 'SCALING', or 'IDLE'
     */
    static emitStatus(io, userId, state) {
        const payload = {
            state: state, // This triggers your 3D rolling animation
            timestamp: new Date(),
            source: 'Nexus-Chef-AI'
        };

        // Send only to that specific user's screen
        io.to(`presence_${userId}`).emit('presence_change', payload);
    }
}

module.exports = PresenceService;