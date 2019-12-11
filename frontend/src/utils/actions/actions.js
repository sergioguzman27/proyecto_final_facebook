// import { LOGIN } from './actions-types';
import { LOGIN, GET_POSTS } from '../actions/action-types';

export function login(user) {
	return {
		type: LOGIN,
		payload: {
			username: user.username,
			email: user.email,
			token: user.token
		}
	}
}

export function get_posts(data) {
	return {
		type: GET_POSTS,
		payload: {
			data
		}
	}
}
