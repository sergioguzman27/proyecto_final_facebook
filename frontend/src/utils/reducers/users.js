import { fromJS } from 'immutable';
import { GET_USERS } from '../actions/action-types';

const initialState = fromJS({
  users: {
    previous: null,
    next: null,
    results: [],
    count: null,
  }
})

function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state.merge({
        previous: action.payload.data.previous,
        next: action.payload.data.next,
        results: action.payload.data.results,
        count: action.payload.data.count
      });
    default:
      return state;
  }
}

export default users;
