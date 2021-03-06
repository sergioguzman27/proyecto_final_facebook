import { fromJS } from 'immutable';
import { GET_POSTS } from '../actions/action-types';

const initialState = fromJS({
  posts: {
    previous: null,
    next: null,
    results: [],
    count: null,
  }
})

function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
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

export default posts;
