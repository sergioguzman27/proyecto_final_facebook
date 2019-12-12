import { combineReducers } from 'redux-immutable';
import user from './user';
import post from './post';
import posts from './posts';

const rootReducer = combineReducers({
  user,
  posts,
  post
})

export default rootReducer;
