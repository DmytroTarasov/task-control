import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, required: true },
    todo_color: { type: String, default: '#F0F0F0' },
    in_progress_color: { type: String, default: '#F0F0F0' },
    done_color: { type: String, default: '#F0F0F0' },
    tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Task' }]
});

const Board = mongoose.model('Board', boardSchema);

const validateBoardCreate = (board) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    });
    return schema.validate(board);
}

const validateBoardEdit = (board) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(board);
}

export { Board, validateBoardCreate, validateBoardEdit };
