import mongoose from 'mongoose';

import { Board } from "../models/board.js";
import { Task } from '../models/task.js';
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
    getAllBoards: (queryParams) => new Promise(async (resolve, reject) => {
        const { boardName, sortBy, sortDirection } = queryParams;
        let boards;
        try {
            const filterOptions = {};
            const sortOptions = {};
            if (boardName) {
                filterOptions['name'] = { $regex: `${boardName}`, $options: "$i" };
            }
            if (sortBy) {
                sortOptions[sortBy] = sortDirection && sortDirection.toLowerCase() === 'desc' ? -1 : 1;
            }
            boards = await Board
                .find(filterOptions)
                .populate({
                    path: 'tasks',
                    select: '-__v'
                })
                .sort(sortOptions)
                .select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve(boards);
    }),
    filterBoardsByName: (name) => new Promise(async (resolve, reject) => {
        let boards;
        try {
            boards = await Board.find({ name: { $regex: `${name}`, $options: "$i" } }).select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve(boards)
    }),
    editBoard: (id, name) => new Promise(async (resolve, reject) => {
        try {
            await Board.findByIdAndUpdate(id, { name: name });
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    getBoardById: (id, queryParams) => new Promise(async (resolve, reject) => {
        const { taskName, sortBy, sortDirection } = queryParams;
        let board;
        try {
            const sortOptions = {};
            const matchOptions = {};
            if (taskName) {
                matchOptions['name'] = { $regex: `${taskName}`, $options: "$i" };
            }
            if (sortBy) {
                sortOptions[sortBy] = sortDirection && sortDirection.toLowerCase() === 'desc' ? -1 : 1;
            }
            board = await Board.findById(id).populate({
                path: 'tasks',
                match: matchOptions,
                options: { sort: sortOptions }
            }).select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve(board);
    }),
    setColumnColor: (id, colorType, color) => new Promise(async(resolve, reject) => {
        try {
            await Board.findByIdAndUpdate(id, { [colorType]: color });
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    }),
    deleteBoard: (id) => new Promise(async(resolve, reject) => {
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await Task.deleteMany({ board: id }).session(sess);
            await Board.findByIdAndRemove(id).session(sess);
            await sess.commitTransaction();

        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
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