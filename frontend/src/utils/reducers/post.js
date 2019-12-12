import { fromJS } from 'immutable';
import { GET_POST } from '../actions/action-types';

const initialState = fromJS({
  post: {}
})

function post(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return state.merge({
        data: action.payload.data
      });
    default:
      return state;
  }
}

export default post;
