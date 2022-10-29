import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, required: true },
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
