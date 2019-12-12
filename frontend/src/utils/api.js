import request from 'superagent';

// const host = 'https://swapi.co/api/';
// const host = 'http://localhost:8000/api/'
const host = '/api/';

function getToken(need_token) {
  let token = null;
  if (need_token) {
    token = localStorage.getItem('token');
    if (token) {
      return `Token ${token}`;
    }
  }
  return false;
}

function _get(path, need_token) {
  const endpoint = host + path;
  const token = getToken(need_token);
  if (token) {
    return request.get(endpoint).set('Accept', 'application/json').set('Content-Type', 'application/json')
      .set('Authorization', token);
  }
  return request.get(endpoint).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

function _post(path, body, need_token) {
  const endpoint = host + path;
  const token = getToken(need_token);
  if (token) {
    return request.post(endpoint).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
      .set('Authorization', token);
  }
  return request.post(endpoint).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

function _put(path, body, need_token) {
  const endpoint = host + path;
  const token = getToken(need_token);
  if (token) {
    return request.put(endpoint).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json')
      .set('Authorization', token);
  }
  return request.put(endpoint).send(body).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

function _delete(path, need_token) {
  const endpoint = host + path;
  const token = getToken(need_token);
  if (token) {
    return request.delete(endpoint).set('Accept', 'application/json').set('Content-Type', 'application/json')
      .set('Authorization', token);
  }
  return request.delete(endpoint).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

function get(path, need_token = false, params = {}) {
  console.log('Get');
  return new Promise((resolve, reject) => {
    _get(path, need_token, params).then((response) => {
      if (response.body) {
        resolve(response.body);
      }
      resolve(response);
    }).catch((error) => {
      reject(error.response.body);
    });
  });
}

function post(path, body, need_token = false) {
  console.log('Post');
  return new Promise((resolve, reject) => {
    _post(path, body, need_token).then((response) => {
      if (response.body) {
        resolve(response.body);
      }
      resolve(response);
    }).catch((error) => {
      if (error.response.body) {
        reject(error.response.body);
      }
      reject(error.response);
      //reject(error);
    });
  });
}

function put(path, body, need_token = false) {
  console.log('Put');
  return new Promise((resolve, reject) => {
    _put(path, body, need_token).then((response) => {
      if (response.body) {
        resolve(response.body);
      }
      resolve(response);
    }).catch((error) => {
      reject(error.response.body);
      //reject(error);
    });
  });
}

function eliminar(path, need_token = false) {
  console.log('Delete');
  return new Promise((resolve, reject) => {
    _delete(path, need_token).then((response) => {
      if (response.body) {
        resolve(response.body);
      }
      resolve(response);
    }).catch((error) => {
      reject(error.response.body);
      //reject(error);
    });
  });
}

export const api = { get, post, put,eliminar };
