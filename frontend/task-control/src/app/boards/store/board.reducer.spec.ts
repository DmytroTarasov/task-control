import { TypedAction } from '@ngrx/store/src/models';
import * as fromReducer from './board.reducer';
import * as BoardActions from './board.actions';

describe('AuthReducer', () => {
  const { initialState } = fromReducer;
  let state = { ...initialState, boards: [] };

  const task = { _id: '1', name: 'task1', status: 'done', board: '1', archived: false };
  const board = { _id: '1', name: 'board1', description: 'descr1', tasks: [task] };
  const performAction = (state: fromReducer.State, action: TypedAction<string>) =>
    fromReducer.boardReducer(state, action);

  beforeAll(() => {
    state = performAction(state, BoardActions.addBoard({ board }));
    state = performAction(state, BoardActions.setSelectedBoard({ board }));
  });

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const newState = performAction(state, action);
      expect(newState).toBe(state);
    });
  });

  describe('[Boards] Set Selected Board', () => {
    it('should set selected board', () => {
      const board = { name: 'board1', description: 'descr1' };
      const newState = performAction(
        state,
        BoardActions.setSelectedBoard({ board })
      );
      expect(newState).toEqual({ ...state, selectedBoard: board });
    });
  });

  describe('[Boards] Set Boards', () => {
    it('should set boards', () => {
      const boards = [{ name: 'board1', description: 'descr1' }];
      const newState = performAction(state, BoardActions.setBoards({ boards }));
      expect(newState).toEqual({ ...state, boards });
    });
  });

  describe('[Boards] Add Board', () => {
    it('should add board to all boards', () => {
      const board = { name: 'board1', description: 'descr1' };
      const newState = performAction(state, BoardActions.addBoard({ board }));
      expect(newState).toEqual({ ...state, boards: [...state.boards, board] });
    });
  });

  describe('[Boards] Update Board', () => {
    it('should update board name', () => {
      const newName = 'newBoard1';
      const newState = performAction(
        state,
        BoardActions.updateBoard({ id: board._id, newName })
      );
      expect(newState).toEqual({
        ...state,
        boards: [{ ...board, name: newName }],
      });
    });
  });

  describe('[Boards] Delete Board', () => {
    it('should delete board', () => {
      const newState = performAction(
        state,
        BoardActions.deleteBoard({ id: board._id })
      );
      expect(newState).toEqual({ ...initialState, boards: [] });
    });
  });

  describe('[Boards] Set Column Color', () => {
    it('should set column color', () => {
      const newState = performAction(
        state,
        BoardActions.setColumnColor({ colorType: 'done_color', color: 'black' })
      );
      expect(newState).toEqual({
        ...state,
        selectedBoard: { ...board, done_color: 'black' },
      });
    });
  });

  describe('[Boards] Add Task To Board', () => {
    it('should add task to the selected board', () => {
      const task = { name: 'task1', status: 'done', board: '1' };
      const newState = performAction(
        state,
        BoardActions.addTaskToBoard({ task })
      );
      expect(newState).toEqual({
        ...state,
        selectedBoard: {
          ...board,
          tasks: [...state.selectedBoard.tasks, task],
        },
      });
    });
  });

  describe('[Boards] Update Board Task', () => {
    it('should update task of the selected board', () => {
      const newState = performAction(
        state,
        BoardActions.updateBoardTask({
          id: task._id,
          newName: 'newTask1',
          newStatus: task.status,
        })
      );
      expect(newState).toEqual({
        ...state,
        selectedBoard: { ...board, tasks: [{ ...task, name: 'newTask1' }] },
      });
    });
  });

  describe('[Boards] Delete Board Task', () => {
    it('should detete task from the selected board', () => {
      const newState = performAction(
        state,
        BoardActions.deleteBoardTask({ id: task._id })
      );
      expect(newState).toEqual({
        ...state,
        selectedBoard: { ...board, tasks: [] },
      });
    });
  });

  describe('[Boards] Archive Board Task', () => {
    it('should archive task of the selected board', () => {
      const newState = performAction(
        state,
        BoardActions.archiveBoardTask({ id: task._id })
      );
      expect(newState).toEqual({
        ...state,
        selectedBoard: { ...board, tasks: [{ ...task, archived: true }] },
      });
    });
  });
});
