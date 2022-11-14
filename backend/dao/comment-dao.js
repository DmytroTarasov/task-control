import mongoose from 'mongoose';

import { Task } from '../models/task.js';
import { Comment } from '../models/comment.js';
import HttpError from "../models/http-error.js";

export default () => ({
    saveComment: (comment) => new Promise(async (resolve, reject) => {
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await comment.save({ session: sess });
            await Task.updateOne({ _id: comment.task }, { $push: { comments: comment } }).session(sess);
            await sess.commitTransaction();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    deleteComment: (id) => new Promise(async(resolve, reject) => {
        try {
            const comment = await Comment.findById(id).populate('task');
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await comment.remove({ session: sess });
            comment.task.comments.pull(comment);
            await comment.task.save({ session: sess });
            await sess.commitTransaction();

        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
});