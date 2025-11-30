const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new mongoose.Schema({
    habitName : {type: String , required : true},
    description : String, 
    categories : {type : String , required : true},
    type :{
        type : String, 
        enum:["yes" , "no"],
        default:"yes"
    },
    startDate : {type : Date , required: true},
    endDate : Date
});

const taskSchema = new mongoose.Schema({
    taskName : {type:String , required: true},
    description :String, 
    categories : String,
    startDate : {type: Date , required : true},
    endDate : Date
});

const recurringTaskSchema = new mongoose.Schema({
    taskName : {type: String , required : true}, 
    description : String, 
    startDate : {type : Date , required : true},
    endDate : Date
});

const habitModel = mongoose.model("Habit", habitSchema);
const taskModel = mongoose.model("Task" , taskSchema);
const recurringTaskModel= mongoose.model("RecurringTask", recurringTaskSchema);

module.exports={
    habitModel,
    taskModel, 
    recurringTaskModel
};