import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    created_at: { type: String, required: true },
    created_by: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    board: { type: mongoose.Types.ObjectId, required: true, ref: 'Board' }
});

const Task = mongoose.model('Task', taskSchema);

const validateTaskCreate = (task) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        status: Joi.string().valid('Todo', 'In Progress', 'Done').required(),
        board: Joi.string().required()
    });
    return schema.validate(task);
}

export { Task, validateTaskCreate };
