import tasksService from "../services/tasks-service.js";

export const createTask = async (req, res, next) => {
    tasksService().createTask(req.body, req.userData.userId)
        .then(task => res.status(201).json(task))
        .catch(err => next(err));
}

export const editTask = async (req, res, next) => {
    tasksService().editTask(req.params.taskId, req.body.name, req.body.status)
        .then(() => res.status(200).json({ message: 'Task was successfully edited' }))
        .catch(err => next(err));
}

export const deleteTask = async (req, res, next) => {
    tasksService().deleteTask(req.params.taskId)
        .then(() => res.status(200).json({ message: 'Task was successfully deleted' }))
        .catch(err => next(err));
}

export const archiveTask = async (req, res, next) => {
    tasksService().archiveTask(req.params.taskId)
        .then(() => res.status(200).json({ message: 'Task was successfully archived' }))
        .catch(err => next(err));
}

export const getTaskById = async (req, res, next) => {
    tasksService().getTaskById(req.params.taskId)
        .then((task) => res.status(200).json(task))
        .catch(err => next(err));
}