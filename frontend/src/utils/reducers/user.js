import { fromJS } from 'immutable';
import { LOGIN, LOGOUT } from '../actions/action-types';

const initialState = fromJS({
  user: {
    username: null,
    email: null,
    token: null
  },
})

function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.merge({
        username: action.payload.username,
        email: action.payload.email,
        token: action.payload.token
      });

    case LOGOUT:
      return state.merge({
        username: null,
        email: null,
        token: null
      });
    default:
      return state;
  }
}

export default user;