import { renderRecentReducer } from "../renderRecentReducer";

describe('renderRecentReducer', () => {

  it('should toggle render recent boolean if passed in an action type of ADD_RECENT_MOVIES', () => {
    const initialState = true;
    const mockAction = {
      type: 'TOGGLE_RENDER_RECENT',
      toggle: false
    };

    const result = renderRecentReducer(initialState, mockAction);
    
    const expected = false;

    expect(result).toEqual(expected);
  });

  it('should return true if it is passed an action that has a type of LOGOUT', () => {
    const initialState = true;
    const mockAction = {
      type: 'LOGOUT'
    };

    const result = renderRecentReducer(initialState, mockAction);

    expect(result).toEqual(true);
  });

  it('should return state if it is passed an action that does not have a type of ADD_RECENT_MOVIES', () => {
    const initialState = true;
    const mockAction = {
      type: 'YTHOU',
      recentMovieData: [{title: 'Space Jam'}]
    };

    const result = renderRecentReducer(initialState, mockAction);

    expect(result).toEqual(initialState);
  });
});
