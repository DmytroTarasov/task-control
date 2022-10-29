import mongoose from 'mongoose';

import { Task } from "../models/task.js";
import { Board } from "../models/board.js";
import HttpError from "../models/http-error.js";

export default () => ({
    saveTask: (task) => new Promise(async (resolve, reject) => {
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await task.save({ session: sess });
            await Board.updateOne({ _id: task.board }, { $push: { tasks: task }}).session(sess);
            await sess.commitTransaction();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    })
});