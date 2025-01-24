const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(200),
    status: Joi.string().valid('pending', 'completed').required(),
    dueDate: Joi.date().greater('now'),
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

module.exports = validateTask;
