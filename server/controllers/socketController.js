const redisClient = require('../redis');

module.exports.authorizeUser = (socket, next) => {
    if (!socket.request.session || !socket.request.session.user){
        console.log("Bad request!");
        next(new Error("Not authorized"));
    } else {
        next();
    }
}

module.exports.initializeUser = async socket => {
    socket.user = { ...socket.request.session.user }
    socket.join(socket.user.userid);
    await redisClient.hset(
        `userid:${socket.user.username}`, 
        "userid", 
        socket.user.userid,
        "connected",
        true
    );

    const friendList = await redisClient.lrange(
        `friends:${socket.user.username}`,
        0,
        -1
    );

    console.log(friendList)
    socket.emit("friends", friendList)
    console.log("user id: ", socket.user.userid,
        "/ username: ", socket.user.username
    );
};

module.exports.addFriend = async ( socket, friendName, cb ) => {
    
    if (friendName === socket.user.username) {
        console.log("cannot add self")
        console.log(friendUserID)
        cb({ done: false, errorMsg: "Cannot add self!" });
        return;
    }
    
    const friend = await redisClient.hgetall(
        `userid:${friendName}`
    );

    const currentFriendList = await redisClient.lrange(
        `friends:${friendName}`,
        0,
        -1    
    );

    if (!friend)  {
        cb({ done: false, errorMsg: "User doesn't exist!" });
        return;
    }

    if (currentFriendList && currentFriendList.indexOf(friendName) !== -1)  {
        cb({ done: false, errorMsg: "Friend already added!" });
        return;
    }

    await redisClient.lpush(`friends:${socket.user.username}`, [
        friendName, 
        friend.userid
    ].join("."));

    cb({ done: true })
}

module.exports.onDisconnect = async (socket) => {
    await redisClient.hset(`userid:${socket.user.username}`, "connected", false)
}