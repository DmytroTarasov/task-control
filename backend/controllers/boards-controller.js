import boardsService from "../services/boards-service.js";

export const createBoard = async (req, res, next) => {
    boardsService().createBoard(req.body)
        .then(board => res.status(200).json(board))
        .catch(err => next(err));
}

export const getBoards = async (req, res, next) => {
    boardsService().getBoards(req.query)
        .then(boards => res.status(200).json(boards))
        .catch(err => next(err));
}

export const getBoardById = async (req, res, next) => {
    boardsService().getBoardById(req.params.boardId, req.query)
        .then(board => res.status(200).json(board))
        .catch(err => next(err));
}

export const editBoard = async (req, res, next) => {
    boardsService().editBoard(req.params.boardId, req.body.name)
        .then(() => res.status(201).json({ message: 'Board was successfully edited'}))
        .catch(err => next(err));
}

// export const getFilteredBoardsByName = async (req, res, next) => {
//     boardsService().getFilteredBoardsByName(req.query.name)
//         .then(boards => res.status(200).json(boards))
//         .catch(err => next(err));
// }