import { Board } from '../../_models/board.model';
import * as BoardActions from './board.actions';

export interface State {
  selectedBoard: Board;
  boards: Board[];
}

const initialState: State = {
  selectedBoard: null,
  boards: []
};

export function boardReducer(
  state: State = initialState,
  action: BoardActions.BoardActions
) {
  switch (action.type) {
    case BoardActions.SET_SELECTED_BOARD:
      return {
        ...state,
        selectedBoard: { ...action.payload }
      }
    case BoardActions.SET_BOARDS:
      return {
        ...state,
        boards: [...action.payload]
      }
    case BoardActions.ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case BoardActions.UPDATE_BOARD:
      const boardToUpdate = state.boards.find(board => board._id === action.payload.id);
      const updatedBoard = { ...boardToUpdate, name: action.payload.newName };
      const updatedBoardIndex = state.boards.indexOf(boardToUpdate);
      const updatedBoards = [...state.boards.slice(0, updatedBoardIndex), updatedBoard,
        ...state.boards.slice(updatedBoardIndex + 1)];

      return {
        ...state,
        boards: updatedBoards
      };
    case BoardActions.DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board._id !== action.payload),
        selectedBoard: null
      };
    default:
      return state;
  }
}
