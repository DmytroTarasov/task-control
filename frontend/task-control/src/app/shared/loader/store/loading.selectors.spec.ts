import { State } from './loading.reducer';
import { getLoading } from './loading.selectors';

describe('LoadingSelectors', () => {
  const initialState: State = {
    loading: false,
  };

  it('should select the loading value', () => {
    const result = getLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });
});
