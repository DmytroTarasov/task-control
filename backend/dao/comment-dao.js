import mongoose from 'mongoose';

import { Task } from '../models/task.js';
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
    })
});