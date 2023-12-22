const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema
const quizSchema = new Schema(
    {
        name:{
            type:String,
            required: true,
            unique: true,
        },
        question_list:[
            {
              questions_number:{
                type:Number,
                // required: true
              },
              question:String,
              options:{

              }
            }
            
        ],
        answers:{},
        created_by:{
            // created by mongo
            type: mongoose.Types.ObjectId,
            required: true
        },
        is_published:{
            type:Boolean,
            default:false
        }
    },
    // created and updated automatically
    {timestamps:true}

);
// model
const Quiz = mongoose.model("Quiz",quizSchema);

module.exports = Quiz;