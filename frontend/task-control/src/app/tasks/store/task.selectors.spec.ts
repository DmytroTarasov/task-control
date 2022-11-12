import { getSelectedTask } from './task.selectors';
import { State } from './task.reducer';

describe('BoardSelectors', () => {
  const initialState: State = {
    selectedTask: { _id: '1', name: 'task1', status: 'Todo', board: '1' }
  };

  it('should select selected task', () => {
    const result = getSelectedTask.projector(initialState);
    expect(result).toEqual(initialState.selectedTask);
  });
})


