const Users = require("../model/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sentMail = require("../utils/nodemailer");
// const pdfmake = require("../utils/pdfmake");

const userpost = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // console.log(req.files);



        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log("user", user);

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashpassoword = await bcrypt.hash(password, 10);

        console.log("hashpassoword", hashpassoword);

        if (!hashpassoword) {
            return res.status(400).json({
                success: false,
                message: "password is valid while hasing error.",
            });
        }

        const newdata = await Users.create({ ...req.body, password: hashpassoword })
        // , avtar: req.file.path

        console.log("newdata", newdata);


        if (!newdata) {
            return res.status(500).json({
                success: false,
                message: "internal server erorr.",
            });
        }

        const newdataf = await Users.findById({ _id: newdata._id }).select("-password");

        console.log("newdataf", newdataf);

        if (!newdataf) {
            return res.status(404).json({
                success: false,
                message: "internal server erorr.",
            });
        }
        res.status(201).json({
            success: true,
            message: "user created successfully.",
            data: newdataf
        });

        // await sentMail(email)



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

const registerOTP = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "OTP verification is complete."
    })
}

const verifyotp = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "verify with OTP succesfully"
    })
}
// const generateAuthToken = async (id) => {
//     console.log("generateAuthToken", id);
//     try {

//         const user = await Users.findById(id);


//         const accessToken = jwt.sign({
//             _id: user._id,
//             role: user.role,
//             expiresIn: '1 hours'
//         }, process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: 3600 });

//         console.log("accessToken", accessToken);

//         const refreshToken = await jwt.sign({
//             _id: id
//         },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '10 days' });

//         console.log("refreshToken", refreshToken);

//         user.refreshToken = refreshToken

//         await user.save({ validateBeforeSave: false });

//         return { accessToken, refreshToken }
//     } catch (error) {
//         console.log(error);
//     }
// }

const generateAuthToken = async (id) => {
    try {
        const user = await Users.findById(id);
        if (!user) {
            throw new Error('User not found');
        }

        const accessToken = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }  // 1 hour
        );

        const refreshToken = jwt.sign(
            { _id: id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '10d' }  // 10 days
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {

        throw new Error('Error generating tokens');
    }
};

// Add appropriate error handling in other functions as well


const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await Users.findOne({ $or: [{ email }] });

        console.log("userlogin", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const ValidtUser = await bcrypt.compare(password, user.password);
        console.log("userValidtUser", ValidtUser);

        if (!ValidtUser) {
            return res.status(400).json({
                success: false,
                message: "password not match"
            })
        }

        const { accessToken, refreshToken } = await generateAuthToken(user._id);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        const newdataf = await Users.findById({ _id: user._id }).select("-password -refreshToken");

        const optionacc = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 1000
        }

        const optionref = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 60 * 60 * 24 * 10 * 1000
        }


        res.status(200)
            .cookie("accessToken", accessToken, optionacc)
            .cookie("refreshToken", refreshToken, optionref)
            .json({
                success: true,
                message: "login successfully",
                data: { ...newdataf.toObject(), accessToken }
            })



    } catch (error) {
        console.log(error);
    }
}

const getnewtoken = async (req, res) => {
    try {
        console.log(req.cookies.refreshToken);
        const cheackToken = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
       
        
        

        console.log("cheackToken", cheackToken);

        if (!cheackToken) {
            return res.status(401).json({
                success: false,
                message: "Token Expired"
            })
        }

        const user = await Users.findById(cheackToken._id)

        console.log("userssssssssssssssss", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const { accessToken, refreshToken } = await generateAuthToken(user._id);

        console.log({ "accessToken, refreshtoken": accessToken, refreshToken });


        const option = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }


        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "ganret new token",
                data: { accessToken }
            })

    } catch (error) {
        console.log(error);
    }
}


// const getnewtoken = async (req, res) => {
//     try {
//         const token = req.cookies.refreshToken;
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Refresh token missing"
//             });
//         }

//         const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//         const user = await Users.findById(decoded._id);
//         if (!user || user.refreshToken !== token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token"
//             });
//         }

//         const { accessToken, refreshToken } = await generateAuthToken(user._id);
//         res.status(200)
//             .cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 })
//             .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 10 * 1000 })
//             .json({
//                 success: true,
//                 message: "New tokens generated",
//                 data: { accessToken }
//             });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };



const logout = async (req, res) => {
    try {
        console.log(req.body._id);

        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset: { refreshToken: 1 }
            },
            {
                new: true
            }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not logged out"
            })
        }
        res.status(200)
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .json({
                success: true,
                message: "User Logeed Out."

            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}


const checkAuth = async (req, res) => {
    try {
        const accessToken = await req.cookies.accessToken
        console.log(accessToken);

        if (!accessToken) {
            return res.status(401).json({
                success: false, 
                message: "Token not found"
            })
        }

        const velidateUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(velidateUser);

        if (!velidateUser) {
            return res.status(400).json({
                success: false,
                message: "User Authenticated"
            })
        }


        return res.status(200).json({
            success: true,
            data: velidateUser,
            message: "expiry "
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error:" + error.message
        })
    }
}
module.exports = { userpost, login, getnewtoken, logout, registerOTP, verifyotp, checkAuth, generateAuthToken }









