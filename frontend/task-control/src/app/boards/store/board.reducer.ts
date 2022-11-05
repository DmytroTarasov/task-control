import { createReducer, on } from '@ngrx/store';

import { Board } from '../../_models/board.model';
import * as BoardActions from './board.actions';

export interface State {
  selectedBoard: Board;
  boards: Board[];
}

const initialState: State = {
  selectedBoard: null,
  boards: null,
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.setSelectedBoard, (state, { board }) => ({
    ...state,
    selectedBoard: { ...board },
  })),
  on(BoardActions.setBoards, (state, { boards }) => ({
    ...state,
    boards: [...boards],
  })),
  on(BoardActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardActions.updateBoard, (state, { id, newName }) => {
    const boardToUpdate = state.boards.find((board) => board._id === id);
    const updatedBoard = { ...boardToUpdate, name: newName };
    const updatedBoardIndex = state.boards.indexOf(boardToUpdate);
    const updatedBoards = [
      ...state.boards.slice(0, updatedBoardIndex),
      updatedBoard,
      ...state.boards.slice(updatedBoardIndex + 1),
    ];
    return {
      ...state,
      boards: updatedBoards,
    };
  }),
  on(BoardActions.deleteBoard, (state, { id }) => ({
    ...state,
    boards: state.boards.filter((board) => board._id !== id),
    selectedBoard: null,
  })),
  on(BoardActions.addTaskToBoard, (state, { task }) => {
    const selectedBoardUpdated = {
      ...state.selectedBoard,
      tasks: [...state.selectedBoard.tasks, task],
    };
    return {
      ...state,
      selectedBoard: selectedBoardUpdated,
    };
  }),
  on(BoardActions.updateBoardTask, (state, { id, newName, newStatus }) => {
    const taskToUpdate = state.selectedBoard.tasks.find(
      (task) => task._id === id
    );
    const updatedTask = {
      ...taskToUpdate,
      name: newName,
      status: newStatus,
    };
    const updatedTaskIndex = state.selectedBoard.tasks.indexOf(taskToUpdate);
    const selectedBoardUpdated = {
      ...state.selectedBoard,
      tasks: [
        ...state.selectedBoard.tasks.slice(0, updatedTaskIndex),
        updatedTask,
        ...state.selectedBoard.tasks.slice(updatedTaskIndex + 1),
      ],
    };
    return {
      ...state,
      selectedBoard: selectedBoardUpdated,
    };
  }),
  on(BoardActions.deleteBoardTask, (state, { id }) => {
    const selectedBoardUpdated = {
      ...state.selectedBoard,
      tasks: [...state.selectedBoard.tasks.filter((task) => task._id !== id)],
    };
    return {
      ...state,
      selectedBoard: selectedBoardUpdated,
    };
  }),
  on(BoardActions.archiveBoardTask, (state, { id }) => {
    const taskToArchive = state.selectedBoard.tasks.find(
      (task) => task._id === id
    );
    const archivedTask = {
      ...taskToArchive,
      archived: true,
    };
    const archivedTaskIndex = state.selectedBoard.tasks.indexOf(taskToArchive);
    const selectedBoardUpdated = {
      ...state.selectedBoard,
      tasks: [
        ...state.selectedBoard.tasks.slice(0, archivedTaskIndex),
        archivedTask,
        ...state.selectedBoard.tasks.slice(archivedTaskIndex + 1),
      ],
    };
    return {
      ...state,
      selectedBoard: selectedBoardUpdated,
    };
  }),
  on(BoardActions.setColumnColor, (state, { colorType, color }) => {
    const selectedBoardUpdated = { ...state.selectedBoard, [colorType]: color };
      return {
        ...state,
        selectedBoard: selectedBoardUpdated
      };
  })
);
