const Router = require("express");
const recurringTaskRouter = Router();
const { recurringTaskModel } = require("../db");

// POST request - Add Recurring Task
recurringTaskRouter.post("/add", async (req, res) => {
    try {
        const { name, description, categories, repeatType, startDate, endDate } = req.body;

        const newRecurringTask = new recurringTaskModel({
            name,
            description,
            categories,
            repeatType,
            startDate,
            endDate
        });

        await newRecurringTask.save();

        res.status(200).json({
            message: "The new recurring task is added"
        });

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
});


// GET all recurring tasks
recurringTaskRouter.get("/all", async (req, res) => {
    try {
        const tasks = await recurringTaskModel.find();
        if (!tasks) {
            return res.status(404).json({
                message: "No recurring tasks found"
            });
        }

        res.status(200).json({
            data: tasks
        });

    } catch (err) {
        res.status(500).json({
            message: "Invalid request"
        });
    }
});


// GET recurring task by ID
recurringTaskRouter.get("/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await recurringTaskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "No recurring task found with this id"
            });
        }

        res.status(200).json({
            data: task
        });

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
});


// GET recurring tasks by category
recurringTaskRouter.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const tasks = await recurringTaskModel.find({ categories: category });

        if (!tasks) {
            return res.status(404).json({
                message: "No recurring task found"
            });
        }

        res.status(200).json({
            data: tasks
        });

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
});


// UPDATE recurring task
recurringTaskRouter.put("/update/:id", async (req, res) => {
    try {
        const updatedTask = await recurringTaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Invalid request"
            });
        }

        res.status(200).json({
            message: "The recurring task is updated"
        });

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
});


// DELETE recurring task
recurringTaskRouter.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const task = await recurringTaskModel.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                message: "Invalid request"
            });
        }

        res.status(200).json({
            message: "The recurring task is deleted"
        });

    } catch (err) {
        res.status(500).json({
            err: err.message
        });
    }
});


module.exports = recurringTaskRouter;
