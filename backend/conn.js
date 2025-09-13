const mongoose = require('mongoose');

require('dotenv').config(); // <-- Load .env file

const MONGO_URL = process.env.MONGODB_URI;
mongoose.connect(MONGO_URL).then((res)=>{
    console.log("Database Connected Successfully");
}).catch(err=>{
    console.log("Something Error",err);
})