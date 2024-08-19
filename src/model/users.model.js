// const mongooes = require("mongoose");

// const usersSchema = new mongooes.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true,
//             lowercase: true
//         },
//         email: {
//             type: String,
//             unique: true,
//             trim: true,
//             required: true
//         }, 
//         password: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         role: {
//             type: String,
//             trim: true,
//             required: true
//         },
//         refreshToken : {
//             type: String,
//             // required: true
//         },
//         isActive: {
//             type: Boolean,
//             default: true
//         }
//     },
//     {
//         timestamps: true,
//         versionKey: false
//     }
// );

// const Users = mongooes.model("Users", usersSchema);
// module.exports = Users;


const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            trim: true

        },
        refreshToken: {
            type: String
        },
        accessToken: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
        avtar: {
            type: String
        },
        googleId: {
            type: String
        },
        facebookId: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;