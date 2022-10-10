import boardsService from "../services/boards-service.js";

export const createBoard = async (req, res, next) => {
    boardsService().createBoard(req.body)
        .then(board => res.status(200).json(board))
        .catch(err => next(err));
}

export const getBoards = async (req, res, next) => {
    boardsService().getBoards(req.query.name)
        .then(boards => res.status(200).json(boards))
        .catch(err => next(err));
}

// export const getFilteredBoardsByName = async (req, res, next) => {
//     boardsService().getFilteredBoardsByName(req.query.name)
//         .then(boards => res.status(200).json(boards))
//         .catch(err => next(err));
// }