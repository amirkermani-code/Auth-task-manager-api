const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user._id
        });

        res.status(201).json(task);

    } catch (error) {
        console.error("CREATE TASK ERROR:", error);
        res.status(500).json({ message: "Server error"});
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed ?? task.completed;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);

    } catch (error) {
        console.error("UPDATE TASK ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("DELETE TASK ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        console.error("GET TASK ERROR:", error);
        res.status(500).json({
             message: "Server error"
        });
    }
};