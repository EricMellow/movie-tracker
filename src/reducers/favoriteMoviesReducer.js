export const favoriteMoviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.selectedMovie];
    default:
      return state;
  }
};