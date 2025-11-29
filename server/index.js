const express = require("express");
const mongoose = require("mongoose");
const {habitModel , taskModel , recurringTaskModel} = require("./db.js");
const habitRouter = require("../server/routes/HabitRouter.js");

mongoose.connect("mongodb+srv://saibalajimogili_db_user:admin123@cluster123.5cb5zgu.mongodb.net/Habit_Now")

const app = express();
app.use(express.json());

app.use("/api/v1/habit" , habitRouter);

app.listen(3000 , (req,res)=>{
    console.log("The server is listening in the port 3000");
});