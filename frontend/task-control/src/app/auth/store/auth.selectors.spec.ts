import { getAuthError, getAuthMessage, getAuthUser } from './auth.selectors';
import { State } from './auth.reducer';
import { User } from 'src/app/_models/user.model';

describe('AuthSelectors', () => {
  const initialState: State = {
    authError: 'Invalid creds',
    registerMessage: 'Profile was created successfully',
    user: new User('bob@test.com', 'Bob', '2022-11-06', 'token')
  };

  it('should select the auth error', () => {
    const result = getAuthError.projector(initialState);
    expect(result).toEqual(initialState.authError);
  });

  it('should select the register message', () => {
    const result = getAuthMessage.projector(initialState);
    expect(result).toEqual(initialState.registerMessage);
  });

  it('should select the user', () => {
    const result = getAuthUser.projector(initialState);
    expect(result).toEqual(initialState.user);
  });
})


