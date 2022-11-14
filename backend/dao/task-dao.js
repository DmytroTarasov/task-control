import mongoose from 'mongoose';

import { Task } from "../models/task.js";
import { Board } from "../models/board.js";
import HttpError from "../models/http-error.js";

export default () => ({
    getTaskById: (id) => new Promise(async (resolve, reject) => {
        let task;
        try {
            task = await Task
                .findById(id)
                .populate('comments')
                .populate('created_by', '-_id username')
                .select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve(task);
    }),
    editTask: (id, name, status) => new Promise(async (resolve, reject) => {
        try {
            await Task.findByIdAndUpdate(id, { name, status });
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    archiveTask: (id) => new Promise(async (resolve, reject) => {
        try {
            await Task.findByIdAndUpdate(id, { archived: true });
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    deleteTask: (id) => new Promise(async (resolve, reject) => {
        try {
            const task = await Task.findById(id).populate({ path: 'board' });
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await task.remove({ session: sess });
            task.board.tasks.pull(task);
            await task.board.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    saveTask: (task) => new Promise(async (resolve, reject) => {
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await task.save({ session: sess });
            await Board.updateOne({ _id: task.board }, { $push: { tasks: task } }).session(sess);
            await sess.commitTransaction();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    })
});