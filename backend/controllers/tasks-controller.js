import tasksService from "../services/tasks-service.js";

export const createTask = async (req, res, next) => {
    tasksService().createTask(req.body, req.userData.userId)
        .then(task => res.status(200).json(task))
        .catch(err => next(err));
}