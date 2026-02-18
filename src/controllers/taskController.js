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