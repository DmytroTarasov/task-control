import { TaskModel } from 'src/app/_models/task.model';
import * as TaskActions from './task.actions';

export interface State {
  selectedTask: TaskModel;
}

const initialState: State = {
  selectedTask: null,
};

export function taskReducer(
  state: State = initialState,
  action: TaskActions.TaskActions
) {
  switch (action.type) {
    case TaskActions.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case TaskActions.ADD_COMMENT_TO_TASK:
      const updatedSelectedTask = {
        ...state.selectedTask,
        comments: [...state.selectedTask.comments, action.payload],
      };
      return {
        ...state,
        selectedTask: updatedSelectedTask,
      };
    case TaskActions.DELETE_TASK_COMMENT:
      const selectedTask = {
        ...state.selectedTask,
        comments: [
          ...state.selectedTask.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        ],
      };
      return {
        ...state,
        selectedTask,
      };
    default:
      return state;
  }
}
