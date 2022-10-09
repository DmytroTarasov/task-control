import boardsService from "../services/boards-service.js";

export const createBoard = async (req, res, next) => {
    boardsService().createBoard(req.body)
        .then(_ => res.status(200).json({
            message: 'Board was successfully created'
        }))
        .catch(err => next(err));
}

export const getAllBoards = async (req, res, next) => {
    boardsService().getAllBoards()
        .then(boards => res.status(200).json(boards))
        .catch(err => next(err));
}