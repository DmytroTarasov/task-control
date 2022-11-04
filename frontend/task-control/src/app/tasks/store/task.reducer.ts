import { createReducer, on } from '@ngrx/store';

import { TaskModel } from 'src/app/_models/task.model';
import * as TaskActions from './task.actions';

export interface State {
  selectedTask: TaskModel;
}

const initialState: State = {
  selectedTask: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.setSelectedTask, (state, { task }) => ({
    ...state,
    selectedTask: { ...task },
  })),
  on(TaskActions.addCommentToTask, (state, { comment }) => {
    const updatedSelectedTask = {
      ...state.selectedTask,
      comments: [...state.selectedTask.comments, comment],
    };
    return {
      ...state,
      selectedTask: updatedSelectedTask,
    };
  }),
  on(TaskActions.deleteTaskComment, (state, { id }) => {
    const selectedTask = {
      ...state.selectedTask,
      comments: [
        ...state.selectedTask.comments.filter((comment) => comment._id !== id),
      ],
    };
    return {
      ...state,
      selectedTask,
    };
  })
);
