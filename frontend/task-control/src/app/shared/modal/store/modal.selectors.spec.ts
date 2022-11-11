import { State } from './modal.reducer';
import { getModalOpen } from './modal.selectors';

describe('ModalSelectors', () => {
  const initialState: State = {
    open: false
  };

  it('should select the open value', () => {
    const result = getModalOpen.projector(initialState);
    expect(result).toEqual(initialState.open);
  });
});
