import taskDao from '../dao/task-dao.js';
import { Task } from '../models/task.js';

export default () => ({
    getTaskById: (id) => new Promise(async (resolve, reject) => {
        let task;
        try {
            task = await taskDao().getTaskById(id);
        } catch (err) {
            return reject(err);
        }
        return resolve(task);
    }),
    createTask: (task, userId) => new Promise(async (resolve, reject) => {
        const newTask = new Task({
            ...task,
            created_at: new Date().toISOString(),
            created_by: userId
        });

        try {
            await taskDao().saveTask(newTask);
        } catch (err) {
            return reject(err);
        }
        return resolve(newTask);
    }),
    editTask: (id, name, status) => new Promise(async (resolve, reject) => {
        try {
            await taskDao().editTask(id, name, status);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    }),
    archiveTask: (id) => new Promise(async (resolve, reject) => {
        try {
            await taskDao().archiveTask(id);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    }),
    deleteTask: (id) => new Promise(async (resolve, reject) => {
        try {
            await taskDao().deleteTask(id);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    })
});