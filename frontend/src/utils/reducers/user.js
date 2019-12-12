import { fromJS } from 'immutable';
import { LOGIN, LOGOUT, GET_USER, GET_REPORT } from '../actions/action-types';

const initialState = fromJS({
  user: {
    id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    phone_number: null,
    token: null,
    comments: null,
    reactions: null
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

    case GET_USER:
      return state.merge({
        id: action.payload.data.id,
        username: action.payload.data.username,
        email: action.payload.data.email,
        first_name: action.payload.data.first_name,
        last_name: action.payload.data.last_name,
        phone_number: action.payload.data.phone_number,
      })

    case GET_REPORT:
      return state.merge({
        comments: action.payload.data.comments,
        reactions: action.payload.data.reactions
      })

    default:
      return state;
  }
}

export default user;