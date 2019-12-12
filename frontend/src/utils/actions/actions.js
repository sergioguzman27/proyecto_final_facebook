// import { LOGIN } from './actions-types';
import { LOGIN, GET_POSTS, GET_USER, GET_REPORT,
	GET_POST, GET_COMMENTS, GET_USERS } from '../actions/action-types';

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

export function get_post(data) {
	return {
		type: GET_POST,
		payload: {
			data
		}
	}
}

export function get_user(data) {
	return {
		type: GET_USER,
		payload: {
			data
		}
	}
}

export function get_users(data) {
	return {
		type: GET_USERS,
		payload: {
			data
		}
	}
}

export function get_report(data) {
	return {
		type: GET_REPORT,
		payload: {
			data
		}
	}
}

export function get_comments(data) {
	return {
		type: GET_COMMENTS,
		payload: {
			data
		}
	}
}
