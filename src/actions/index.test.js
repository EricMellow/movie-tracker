import * as action from "./index";

describe('setSelectedMovieId', () => {
  it('should return a selected movie action', () => {
    // setup
    const mockMovieId = 123;
    // exectuion
    const result = action.setSelectedMovieId(mockMovieId);
    // expectation
    const expected = {
      type: 'SET_SELECTED_MOVIE_ID',
      movieId: 123
    };

    expect(result).toEqual(expected);
  });
});

describe('addRecentMovies', () => {
  it('should return a recent movies action', () => {
    // setup
    const mockRecentMovies = [{title: "Happy Days"}, {title: "Bad Days"}];
    // exectuion
    const result = action.addRecentMovies(mockRecentMovies);
    // expectation
    const expected = {
      type: 'ADD_RECENT_MOVIES',
      recentMovieData: mockRecentMovies
    };

    expect(result).toEqual(expected);
  });
});

describe('setUserId', () => {
  it('should return a set usder ID action', () => {
    // setup
    const mockUserId = 23;
    // exectuion
    const result = action.setUserId(mockUserId);
    // expectation
    const expected = {
      type: 'SET_USER_ID',
      userId: 23
    };

    expect(result).toEqual(expected);
  });
});

describe('addFavoriteMovie', () => {
  it('should return a favorite movie action', () => {
    // setup
    const mockSelectedMovie = { title: "Happy Days" }
    // exectuion
    const result = action.addFavoriteMovie(mockSelectedMovie);
    // expectation
    const expected = {
      type: 'ADD_FAVORITE',
      selectedMovie: mockSelectedMovie
    };

    expect(result).toEqual(expected);
  });
});

describe('addStoredFavorites', () => {
  it('should return a stored favorites action', () => {
    // setup
    const mockStoredFavorites = [{ title: "Happy Days" }, { title: "Bad Days" }];
    // exectuion
    const result = action.addStoredFavorites(mockStoredFavorites);
    // expectation
    const expected = {
      type: 'ADD_STORED_FAVORITES',
      favoriteMovies: mockStoredFavorites
    };

    expect(result).toEqual(expected);
  });
});

describe('toggleRenderRecent', () => {
  it('should return a toggle render recent action', () => {
    // setup
    const mockToggle = true;
    // exectuion
    const result = action.toggleRenderRecent(mockToggle);
    // expectation
    const expected = {
      type: 'TOGGLE_RENDER_RECENT',
      toggle: true
    };

    expect(result).toEqual(expected);
  });
});

describe('logout', () => {
  it('should return a logout action', () => {
    // exectuion
    const result = action.logout();
    // expectation
    const expected = {
      type: 'LOGOUT'
    };

    expect(result).toEqual(expected);
  });
});

describe('deleteFavoriteMovie', () => {
  it('should return a delete favorite action', () => {
    // setup
    const mockSelectedMovie = { title: "Happy Days" }
    // exectuion
    const result = action.deleteFavoriteMovie(mockSelectedMovie);
    // expectation
    const expected = {
      type: 'DELETE_FAVORITE',
      selectedMovie: mockSelectedMovie
    };

    expect(result).toEqual(expected);
  });
});