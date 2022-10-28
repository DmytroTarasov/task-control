import HttpError from '../models/http-error.js';
import boardDao from '../dao/board-dao.js';
import { Board } from '../models/board.js';

export default () => ({
    createBoard: (board) => new Promise(async (resolve, reject) => {
        const newBoard = new Board({
            ...board,
            created_at: new Date().toISOString(),
        });

        try {
            await boardDao().saveBoard(newBoard);
        } catch (err) {
            return reject(err);
        }
        return resolve(newBoard);
    }),
    getBoards: (name) => new Promise(async(resolve, reject) => {
        let boards;
        try {
            if (!name) {
                boards = await boardDao().getAllBoards();
            } else {
                boards = await boardDao().filterBoardsByName(name);
            }
            
        } catch (err) {
            return reject(err);
        }

        return resolve(boards);
    }),
    editBoard: (id, name) => new Promise(async(resolve, reject) => {
        try {
            await boardDao().editBoard(id, name);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    })
    // getFilteredBoardsByName: (name) => new Promise(async(resolve, reject) => {
    //     let boards;

    //     try {
    //         boards = await boardDao().filterBoardsByName(name);
    //     } catch (err) {
    //         return reject(err);
    //     }

    //     return resolve(boards);
    // })
});

