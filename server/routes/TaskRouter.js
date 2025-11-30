const Router = require("express");
const taskRouter = Router();
const {taskModel} = require("../db");
    // post request
taskRouter.post("/add" , async(req,res)=>{
    try{
        const {taskName , description , categories , startDate , endDate} = req.body;
        const newTask = new taskModel({
            taskName, 
            description, 
            categories, 
            startDate,
            endDate
        });
        await newTask.save();
        res.status(200).json({
            message:"The new task is added"
        });        
    }
    catch(err){
       res.status(500).json({
        err: err.message
       });
    }
});

// get request

taskRouter.get("/all" , async(req,res)=>{
    try{
        const habits = await taskModel.find();
        if(!habits){
           return  res.status(404).json({
                message :"No task found"
            });
        };
        res.status(200).json({
            data : habits
        });
    }
    catch(err){
        res.status(500).json({
            message :"Invalid request"
        });
    };
});

taskRouter.get("/id/:id" , async(req,res)=>{
    try{
        const {id} = req.params;
        const habits = await taskModel.findById(id);
        if(!habits){
            return res.status(404).json({
                message:"No task found with this id"
            });
        };
        res.status(200).json({
            data:habits
        });
    }
    catch(err){
        res.status(500).json({
            err : err.message
        });
    };
});

taskRouter.get("/category/:category" , async(req,res)=>{
    try{
        const {category} = req.params;
       const habits = await taskModel.find({categories : category});
       if(!habits){
        return res.status(404).json({
            message:"No task found"
        });
       };
       res.status(200).json({
        data: habits
       })
    }
    catch(err){
        res.status(500).json({
            err:err.message
        });
    };
});

taskRouter.put("/update/:id" , async(req,res)=>{
    try{
        
        const habits = await taskModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new :true}
        )
        if(!habits){
            return res.status(404).json({
                message:"Invalid request"
            });
        };
        res.status(200).json({
            message:"The Task is updated"
        });
    }
    catch(err){
        res.status(500).json({
            err:err.message
        });
    };
})

taskRouter.delete("/delete/:id" , async (req,res)=>{
    try{
        const {id} = req.params;
        const habits = await taskModel.findByIdAndDelete(id);
        if (!habits){
            return res.status(404).json({
                message :"Invalid request"
            });
        }
        res.status(200).json({
            message:"The task is deleted"
        });
    }
    catch(err){
        res.status(500).json({
            err: err.message
        });
    };
});

module.exports = taskRouter;
