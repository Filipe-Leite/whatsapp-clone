const redisClient = require("../redis");

module.exports.rateLimiter = 
    (secondsLimit, limitAmount) => async (req, res, next) => {
        const ip = req.connection.remoteAddress.slice(0,6);
        [response] = await redisClient.multi()
                                            .incr(ip)
                                            .expire(ip,secondsLimit)
                                            .exec();

        console.log("module.exports.rateLimiter >>> ", response[1])
        if (response[1] > limitAmount)
            res.json({
                loggedIn: false,
                status: "Slow down!! Try again in a minute."
            })
        else next();
};