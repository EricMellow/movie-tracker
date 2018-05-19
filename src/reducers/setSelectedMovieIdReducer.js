const setSelectedMovieIdReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE_ID':
      return action.movieId;
    default:
      return state;
  }
};