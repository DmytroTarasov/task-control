import HttpError from '../models/http-error.js';
import boardDao from '../dao/board-dao.js';
import { Board } from '../models/board.js';

export default () => ({
    createBoard: (board) => new Promise(async (resolve, reject) => {
        const newBoard = new Board({
            ...board,
            created_at: new Date().toISOString()
        });

        try {
            await boardDao().saveBoard(newBoard);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    }),
    getAllBoards: () => new Promise(async(resolve, reject) => {
        let boards;
        try {
            boards = await boardDao().getAllBoards();
        } catch (err) {
            return reject(err);
        }

        return resolve(boards);
    }),
});

