import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000'
    }
})


let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.sub == userData.sub) && users.push({ ...userData, socketId});
}

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

// const setSender = (account, socketId) => {
//     !senderToSocket.has(sender => sender.sub == account.sub) && senderToSocket.set(account.sub, socketId);
// }

// const setReceiver = (person, socketId) => {
//     !receiverToSocket.has(receiver => receiver.sub == person.sub) && receiverToSocket.set(person.sub, socketId); 
// }
// const content = new Map();

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data);
    })


    // var keys = Object.keys(senderToSocket);
    // keys.forEach(key => {
    //     console.log(key + '|' + senderToSocket[key]);
    // })

    // socket.on("receiver", data=> {
    //     const {person} = data;
    //     // console.log(person);
    //     console.log("receiver ", socket.id);

    //     setReceiver(person, socket.id);
    // })

    socket.on('CallUser', (data)=> {
        const {userToCall, signalData,from, account} = data;

        const receiverSocket = getUser(userToCall);

        const sender = getUser(from);
        io.to(receiverSocket.socketId).emit('CallHim', {signal: signalData, from: sender.socketId, name: account.name});
    });

    socket.on('answerCall', (data) => {
        const {signal, to} = data;
        io.to(to).emit('CallAccepted', signal);
    })
})