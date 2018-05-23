import { userIdReducer } from "../userIdReducer";

describe('userIdReducer', () => {

  it('should add a user ID if an action type of SET_USER_ID is dispatched', () => {
    const initialState = null;
    const mockAction = {
      type: 'SET_USER_ID',
      userId: 12345
    };

    const result = userIdReducer(initialState, mockAction);

    const expected = 12345;

    expect(result).toEqual(expected);
  });

  it('should return initial state if it is passed an action that has a type of LOGOUT', () => {
    const initialState = null;
    const mockAction = {
      type: 'LOGOUT'
    };

    const result = userIdReducer(initialState, mockAction);

    expect(result).toEqual(initialState);
  });

  it('should return state if it is passed an action that does not have a type of ADD_RECENT_MOVIES', () => {
    const initialState = null;
    const mockAction = {
      type: 'YTHOU',
      recentMovieData: [{ title: 'Space Jam' }]
    };

    const result = userIdReducer(initialState, mockAction);

    expect(result).toEqual(initialState);
  });
});
