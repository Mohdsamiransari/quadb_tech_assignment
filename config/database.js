const mongoose = require('mongoose');

exports.dbconnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useUnifiedTopology: true
    })
    .then(()=> console.log(`Connected to database`))
    .catch((error)=>{
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
}