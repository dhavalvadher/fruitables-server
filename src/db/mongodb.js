const mongoose = require('mongoose');
        
const connectDB = async() => {
   try {
    await mongoose.connect("mongodb+srv://dhavalvadher0001:dhavalvadher@cluster0.mhnsm7m.mongodb.net/ecommerce")
    .then(() => console.log("MongoDB connect successfully"))
    .catch(() => console.log("MongoDB Database is not connect"))
   } catch (error) {
    console.log("MongoDB Database is not connect");
   }
}

module.exports = connectDB