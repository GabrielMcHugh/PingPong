let readyPlayerCount = 0

function listen(io) {
    const pongNamespace = io.of('/pong')
    pongNamespace.on('connection', (socket) => {
        console.log('a user connected', socket.id)
        let room = 'Room ' + Math.floor(readyPlayerCount / 2);
        socket.on('ready', () => {
            socket.join(room);

            console.log('Player ready', socket.id, room)

            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        })

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData);
        })

        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData)
        })

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`)
            socket.leave(room)
        })
    })
}

module.exports = {
    listen
}