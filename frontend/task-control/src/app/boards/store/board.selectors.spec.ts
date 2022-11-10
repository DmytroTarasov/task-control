import { getBoards, getBoardById, getSelectedBoard } from './board.selectors';
import { State } from './board.reducer';

describe('BoardSelectors', () => {
  const initialState: State = {
    boards: [{ name: 'board1', description: 'descr1', tasks: [] }],
    selectedBoard: null
  };

  it('should select all boards', () => {
    const result = getBoards.projector(initialState);
    expect(result).toEqual(initialState.boards);
  });

  it('should select selected board', () => {
    const result = getSelectedBoard.projector(initialState);
    expect(result).toEqual(initialState.selectedBoard);
  });

  it('should select board by id', () => {
    const board = initialState.boards[0];
    const result = getBoardById(board._id).projector(initialState);
    expect(result).toEqual(board);
  });
})


