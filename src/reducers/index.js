import { combineReducers } from 'redux';
import { recentMoviesReducer } from './recentMoviesReducer';

export const rootReducer = combineReducers({
  recentMovies: recentMoviesReducer
});
