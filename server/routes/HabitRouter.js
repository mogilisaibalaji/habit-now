const {Router, request} = require("express");
const habitRouter = Router();
const {habitModel} = require("../db");

        // post request
habitRouter.post("/add" , async (req,res)=>{
    try{
    const {habitName , description , categories , type , startDate , endDate } = req.body;

    const newHabit = new habitModel({
        habitName,
        description,
        categories,
        type, 
        startDate,
        endDate
    });
    await newHabit.save();
    res.status(200).json({
        message :"Habit is added to the data base"
    });
}
    catch (err){
        res.status(500).json({
            err : err.message
        });
    };
});
            // get request


habitRouter.get("/all", async (req,res)=>{
    try{
        const habits = await habitModel.find();
        res.status(200).json({
            message: "All habits fetched successfully",
            data: habits
        });
    }
    catch(err){
        res.status(500).json({
            err:err.message
        });
    };
});

habitRouter.get("/id/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const habits = await habitModel.findById(id);
        if(!habits){
           return res.status(404).json({
                message:"No data with this id "
            });
        }
        res.status(200).json({
            data: habits
        });
    }
    catch(err){
        res.status(500).json({
            err:err.message
        });
    };
});

habitRouter.get("/category/:category" , async(req,res)=>{
    try{
        const {category} = req.params;
        const habits = await habitModel.find({categories : category});
        if(!habits){
           return res.status(404).json({
                message:"There is no data in this category"
            });
        };
        res.status(200).json({
            data :habits
        });
    }
    catch(err){
        res.status(500).json({
            err:err.message
        });
        
    };
});

        // update habit

habitRouter.put("/update/:id" , async(req,res)=>{
    try{
        const habits = await habitModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        );
        if(!habits){
            return res.status(404).json({ message: "Habit not found" });
        }

        res.status(200).json({
            message :"The habit is updated",
            data:habits
        });
    }
    catch(err){
        res.status(500).json({
            err : err.message
        });
    };
    
});

        // delete habit
habitRouter.delete("/delete/:id" ,async (req,res)=>{
    try{
        const habits =  await habitModel.findByIdAndDelete(req.params.id);
        if (!habits){
            return res.status(404).json({
                message:"There is no such habit with this id"
            });
        }
        res.status(200).json({
            message:"The habit is deleted"
        })
    }
    catch(err){
        res.status(500).json({
            err : err.message
        });
    };
});

module.exports = habitRouter;