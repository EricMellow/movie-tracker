import { combineReducers } from 'redux';
import { recentMoviesReducer } from './recentMoviesReducer';
import { userIdReducer } from './userIdReducer';
import { setSelectedMovieIdReducer } from './setSelectedMovieIdReducer';

export const rootReducer = combineReducers({
  recentMovies: recentMoviesReducer,
  userId: userIdReducer,
  selectedMovieId: setSelectedMovieIdReducer
});
