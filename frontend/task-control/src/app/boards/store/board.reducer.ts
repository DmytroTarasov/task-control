import { Board } from '../../_models/board.model';
import * as BoardActions from './board.actions';

export interface State {
  selectedBoard: Board;
  boards: Board[];
}

const initialState: State = {
  selectedBoard: null,
  boards: [],
};

export function boardReducer(
  state: State = initialState,
  action: BoardActions.BoardActions
) {
  switch (action.type) {
    case BoardActions.SET_SELECTED_BOARD:
      return {
        ...state,
        selectedBoard: { ...action.payload },
      };
    case BoardActions.SET_BOARDS:
      return {
        ...state,
        boards: [...action.payload],
      };
    case BoardActions.ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case BoardActions.UPDATE_BOARD:
      const boardToUpdate = state.boards.find(
        (board) => board._id === action.payload.id
      );
      const updatedBoard = { ...boardToUpdate, name: action.payload.newName };
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
    case BoardActions.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.payload),
        selectedBoard: null,
      };
    case BoardActions.SET_COLUMN_COLOR:
      const selectedBoardColorUpdated = { ...state.selectedBoard, [action.payload.colorType]: action.payload.color };
      return {
        ...state,
        selectedBoard: selectedBoardColorUpdated
      };
    case BoardActions.ADD_TASK_TO_BOARD:
      const updatedSelectedBoard = {
        ...state.selectedBoard,
        tasks: [...state.selectedBoard.tasks, action.payload],
      };
      return {
        ...state,
        selectedBoard: updatedSelectedBoard,
      };
    case BoardActions.UPDATE_BOARD_TASK:
      const taskToUpdate = state.selectedBoard.tasks.find(
        (task) => task._id === action.payload.id
      );
      const updatedTask = {
        ...taskToUpdate,
        name: action.payload.newName,
        status: action.payload.newStatus,
      };
      const updatedTaskIndex = state.selectedBoard.tasks.indexOf(taskToUpdate);
      const newSelectedBoard = {
        ...state.selectedBoard,
        tasks: [
          ...state.selectedBoard.tasks.slice(0, updatedTaskIndex),
          updatedTask,
          ...state.selectedBoard.tasks.slice(updatedTaskIndex + 1),
        ],
      };
      return {
        ...state,
        selectedBoard: newSelectedBoard,
      };
    case BoardActions.DELETE_BOARD_TASK:
      const selectedBoard = {
        ...state.selectedBoard,
        tasks: [
          ...state.selectedBoard.tasks.filter(
            (task) => task._id !== action.payload
          ),
        ],
      };
      return {
        ...state,
        selectedBoard,
      };
    case BoardActions.ARCHIVE_BOARD_TASK:
      const taskToArchive = state.selectedBoard.tasks.find(
        (task) => task._id === action.payload
      );
      const archivedTask = {
        ...taskToArchive,
        archived: true,
      };
      const archivedTaskIndex =
        state.selectedBoard.tasks.indexOf(taskToArchive);
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
    default:
      return state;
  }
}
