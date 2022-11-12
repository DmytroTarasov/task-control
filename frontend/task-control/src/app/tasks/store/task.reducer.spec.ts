import { TypedAction } from '@ngrx/store/src/models';
import * as fromReducer from './task.reducer';
import * as TaskActions from './task.actions';
import { CommentModel } from 'src/app/_models/comment.model';

describe('TaskReducer', () => {
  const { initialState } = fromReducer;
  const task = { _id: '1', name: 'task1', status: 'done', board: '1', archived: false,
    comments: [{ _id: '1', text: 'text', task: '1' }] };
  let state: fromReducer.State;

  const performAction = (state: fromReducer.State, action: TypedAction<string>) =>
    fromReducer.taskReducer(state, action);

  beforeAll(() => {
    state = performAction(initialState, TaskActions.setSelectedTask({ task }));
  });

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const newState = performAction(initialState, action);
      expect(newState).toBe(initialState);
    });
  });

  describe('[Tasks] Set Selected Task', () => {
    it('should set selected task', () => {
      const newState = performAction(initialState, TaskActions.setSelectedTask({ task }));
      expect(newState).toEqual({ ...initialState, selectedTask: task });
    });
  });

  describe('[Tasks] Add Comment To Task', () => {
    it('should add comment to the task', () => {
      const comment: CommentModel = { _id: '2', text: 'text', created_at: '2022-11-10', task: '1' };
      const newState = performAction(state, TaskActions.addCommentToTask({ comment }));
      expect(newState).toEqual({ ...state, selectedTask: { ...task, comments: [...task.comments, comment]} });
    });
  });

  describe('[Tasks] Delete Task Comment', () => {
    it('should delete comment from the task', () => {
      const newState = performAction(state, TaskActions.deleteTaskComment({ id: '1' }));
      expect(newState.selectedTask.comments).toEqual([]);
    });
  });
});
