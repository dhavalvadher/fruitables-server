const { Server } = require('socket.io');

const connectChat = () => {
    const io = new Server({
        cors: {
            origin: "http://localhost:3000"
        }
    });
    
    io.on('connection', (socket) => {
        console.log('a user connected',socket.id);

        socket.emit("welcome", "welcome to fruitable")

        socket.broadcast.emit("griting", "hello all")

        socket.on("message", (data) => {
            console.log(data);

            io.to(data.receiver).emit('rec-msg',data.message)
        })

        socket.on('join-group',(group_name) => {
            socket.join(group_name)
        })
    });

   
    io.listen(8080);
}

module.exports = connectChat