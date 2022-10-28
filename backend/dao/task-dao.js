import { Task } from "../models/task.js";
import HttpError from "../models/http-error.js";

export default () => ({
    saveTask: (task) => new Promise(async (resolve, reject) => {
        try {
            await task.save();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    })
});