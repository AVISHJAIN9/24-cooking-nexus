module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Nexus Presence: Device Connected');

        // Join a private room for the user
        socket.on('join_presence', (userId) => {
            socket.join(`presence_${userId}`);
        });

        socket.on('disconnect', () => {
            console.log('Nexus Presence: Device Offline');
        });
    });
};