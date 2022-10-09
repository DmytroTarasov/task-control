import { Board } from "../models/board.js";
import HttpError from "../models/http-error.js";

export default () => ({
    findBoardById: (boardId) => new Promise(async (resolve, reject) => {
        let board;

        try {
            board = await Board.findById(boardId).select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }

        if (!board) {
            return reject('Board doesn`t exist', 500);
        }

        return resolve(board);
    }),
    saveBoard: (board) => new Promise(async (resolve, reject) => {
        try {
            await board.save();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    })
});