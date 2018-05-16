import { combineReducers } from 'redux';
import { recentMoviesReducer } from './recentMoviesReducer';
import { addRecentMovies } from '../actions/index';

export const rootReducer = combineReducers({
  recentMovies: recentMoviesReducer
});
