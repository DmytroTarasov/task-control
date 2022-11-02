import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    created_at: { type: String, required: true },
    created_by: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    task: { type: mongoose.Types.ObjectId, required: true, ref: 'Task' }
});

const Comment = mongoose.model('Comment', commentSchema);

const validateCommentCreate = (comment) => {
    const schema = Joi.object({
        text: Joi.string().required(),
        task: Joi.string().required()
    });
    return schema.validate(comment);
}

export { Comment, validateCommentCreate };
