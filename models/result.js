// report
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// schema

const resultSchema = new Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            required: true
        },
        quizId:{
            type:mongoose.Types.ObjectId,
            required: true,
           
        },
        score:{
            type:Number,
            required:true
        },
        total:{
            type:Number,
            required:true
            
        }
    },
    // created and updated automatically
    {timestamps:true}

);




// model
const Result = mongoose.model("Result",resultSchema);

module.exports = Result;