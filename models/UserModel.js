const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    image:{
        type:String
    },
    name:{
        type: String
    },
    email:{
        type: String,
        required:true,
        unique: true,
        
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password cannot be less than 8 characters"],
    },
    orders:[
        {
            type:String
        }
    ],
    last_logged_in:{
        type:Date
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("User",userSchema);