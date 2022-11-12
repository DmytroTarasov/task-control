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
    getBoards: (queryParams) => new Promise(async(resolve, reject) => {
        let boards;
        try {
            boards = await boardDao().getAllBoards(queryParams);
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
    }),
    getBoardById: (id, queryParams) => new Promise(async(resolve, reject) => {
        let board;
        try {
            board = await boardDao().getBoardById(id, queryParams);
        } catch (err) {
            return reject(err);
        }
        return resolve(board);
    }),
    deleteBoard: (id) => new Promise(async(resolve, reject) => {
        try {
            await boardDao().deleteBoard(id);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    }),
    setColumnColor: (id, colorType, color) => new Promise(async(resolve, reject) => {
        try {
            await boardDao().setColumnColor(id, colorType, color);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    })
});

