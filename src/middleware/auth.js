var jwt = require('jsonwebtoken');
const Users = require('../model/users.model');

const auth = (roles = []) => async (req, res, next) => {
    try {
        console.log("dddddd",roles);
        

        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "");

        console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please Proived Token"
            })
        }
        console.log("dddhdhd",token);
        

        try {

            const cheackToken = await jwt.verify(token, "abc123");

            console.log("cheackToken", cheackToken);

            const user = await Users.findById(cheackToken._id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not Found"
                })
            }
            console.log("user", user);

            if (!roles.some((v) => v == user.role)) {
                return res.status(404).json({
                    success: false,
                    message: "you have not access Token"
                })
            }

            console.log("okkkk");

            req.user = user;

            next();

        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal sever error" + error.message
        })
    }

}


module.exports = auth;

