const passport = require('passport');
const Users = require('../model/users.model');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const FacebookStrategy = require('passport-facebook').Strategy;


const googleProvider = async (req,res) => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: process.env.PROVIDER_GOOGLE_CLIENT_ID,
            clientSecret: process.env.PROVIDER_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.PROVIDER_GOOGLE_CALLBACK_URL
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log(profile);
                try {
                     let user = await Users.findOne({ googleId: profile.id })
                     console.log("okk",user);
                     
                    if (!user) {
                        user = await Users.create({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            googleId: profile.id,
                            role: "user",
                        })
                    }
                    console.log(user);
                    
                    return cb(null, user);
                } catch (error) {
                    return cb(error, null);
                }

            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("userrr",user);            
            done(null, user);
        });

       

        passport.deserializeUser(async function (data, done) {
            console.log("dataaaa",data);
            try {
                done(null, data);
            } catch (error) {
                done(error, null);
            }
        });

    } catch (error) {
        console.log(error);
    }
}



const facebookProvider = () => {
    passport.use(new FacebookStrategy({
        clientID: process.env.PROVIDER_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.PROVIDER_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.PROVIDER_FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'emails']
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        try {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
            console.log(email);

            let user = await Users.findOne({ facebookId: profile.id });
            if (!user) {
                user = await Users.create({
                    name: profile.displayName,
                    email: email,
                    facebookId: profile.id,
                    role: "user"
                });
            }
            return cb(null, user);
        } catch (error) {
            console.error('Error in Facebook strategy', error);
            return cb(error, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Users.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

module.exports = {
    googleProvider,
    facebookProvider
}


