import tasksService from "../services/tasks-service.js";

export const createTask = async (req, res, next) => {
    tasksService().createTask(req.body, req.userData.userId)
        .then(task => res.status(200).json(task))
        .catch(err => next(err));
}

export const editTask = async (req, res, next) => {
    tasksService().editTask(req.params.taskId, req.body.name)
        .then(() => res.status(201).json({ message: 'Task was successfully edit'}))
        .catch(err => next(err));
}