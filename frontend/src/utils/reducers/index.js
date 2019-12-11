import { combineReducers } from 'redux-immutable';
import user from './user';
import posts from './posts';

const rootReducer = combineReducers({
  user,
  posts
})

export default rootReducer;
