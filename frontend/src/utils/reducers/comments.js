import { fromJS } from 'immutable';
import { GET_COMMENTS } from '../actions/action-types';

const initialState = fromJS({
  comments: {
    previous: null,
    next: null,
    results: [],
    count: null,
  }
})

function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
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

export default comments;
