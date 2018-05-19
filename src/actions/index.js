export const addRecentMovies = (recentMovieData) => ({
  type: 'ADD_RECENT_MOVIES',
  recentMovieData
});

export const setUserId = (userId) => ({
  type: 'SET_USER_ID',
  userId
});

export const setSelectedMovieId = (movieId) => ({
  type: 'SET_SELECTED_MOVIE_ID',
  movieId
});

export const addFavoriteMovie = (selectedMovie) => ({
  type: 'ADD_FAVORITE',
  selectedMovie
});

export const addStoredFavorites = (favoriteMovies) => ({
  type: 'ADD_STORED_FAVORITES',
  favoriteMovies
});

export const toggleRenderRecent = (bool) => ({
  type: 'TOGGLE_RENDER_RECENT',
  toggle: bool
});