import { combineReducers } from 'redux-immutable';
import user from './user';
import post from './post';
import posts from './posts';
import comments from './comments';
import users from './users';

const rootReducer = combineReducers({
  user,
  posts,
  post,
  comments,
  users
})

export default rootReducer;
