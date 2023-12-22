const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema

const userSchema = new Schema(
    {
        name:{
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password:{
            type:String,
            required:true
        }
    },
    // created and updated automatically
    {timestamps:true}

);




// model
const User = mongoose.model("User",userSchema);

module.exports = User;