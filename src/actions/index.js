export const addRecentMovies = (recentMovieData) => ({
  type: 'ADD_RECENT_MOVIES',
  recentMovieData
});

export const setUserId = (userId) => ({
  type: 'SET_USER_ID',
  userId
});

export const setSelectedMovieId = (movieId)=>({
  type: 'SET_SELECTED_MOVIE_ID',
  movieId
});