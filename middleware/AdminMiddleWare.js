const User = require("../models/userModelMongoose");

async function isAdmin(req, res, next) {
    const userId = req.body.userId;
    try {
        const userInfo = await User.findById({ _id: userId });
        if (userInfo.isAdmin) {
            next();
        } else {
            res.status(403).send("Forbidden access");
            return;
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { isAdmin };
