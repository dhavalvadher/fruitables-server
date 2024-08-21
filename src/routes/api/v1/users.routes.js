

const express = require("express");
const { usersController } = require("../../../model/index");
const passport = require("passport");


const sentMail = require("../../../utils/nodemailer");


const pdfmake = require("../../../utils/pdfmake");
const { sendOTP, verifyOTP } = require("../../../utils/twilio");
const { generateAuthToken } = require("../../../controller/users.controller");
// const upload = require("../../../middleware/upload");


const routes = express.Router();


routes.post(
    "/useradd",
    // upload.single("avtar"),
    usersController.userpost
)

routes.post(
    "/sendOTP",
    sendOTP,
    usersController.registerOTP
)

routes.post(
    "/verifyOTP",
    verifyOTP,
    usersController.verifyotp
)

routes.post(
    "/login",
    usersController.login
)


routes.post(
    "/get-newtoken",
    usersController.getnewtoken

)

routes.post(
    "/logout",
    usersController.logout
)

routes.get(
    "/checkAuth",
    usersController.checkAuth
)

routes.get(
    '/googleLogin',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("qqqqqqqqqqqqqqqqqq");
        console.log(req.isAuthenticated());
        console.log(req.user);
        console.log("ooooooooooooooo");
        

        if(req.isAuthenticated()){
            const { accessToken, refreshToken } = await generateAuthToken(req.user._id);
    
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
                .redirect("http://localhost:3000/")
        }
    });


// routes.get('/facebookLogin',
//     passport.authenticate('facebook', { scope: ['profile', 'email'] }));

// routes.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     function (req, res) {
//         console.log("facebook succes");
//         res.send("<h1>facebook-okkk</h1>");
//     });


// routes.get('/facebookLogin', 
//     passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

// routes.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     (req, res) => {
//         console.log("Facebook login successful");
//         res.send("<h1>Facebook login successful</h1>");
//     });

routes.get('/facebookLogin',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

routes.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        console.log("Facebook login successful");
        res.send("<h1>Facebook login successful</h1>");
    });



// routes.post('/send-email', (req, res) => {
//     server.emit('request', req, res);
// });
routes.get(
    '/sendMail',
    sentMail
)

routes.get(
    '/pdfmake',
    pdfmake
)




module.exports = routes;