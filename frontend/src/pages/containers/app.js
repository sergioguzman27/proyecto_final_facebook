// React, redux, router
import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route, Switch } from 'react-router-dom';

// Utils
import { fromJS } from 'immutable';
import { Map as map } from 'immutable';
import reducer from '../../utils/reducers/index';

// Componentes, Containers y Paginas
import NotFound from '../components/not-found';
import Header from '../../containers/header';
import Login from '../containers/login';
import Profile from './profile';
import Signup from './signup';
import Home from './home';
import Post from './post';

const initialState = fromJS({
  user: {
    id: null,
    username: null,
    email: null,
    first_name: null,
    last_name: null,
    phone_number: null,
    token: null
  },
  posts: {
    previous: null,
    next: null,
    results: [],
    count: null
  },
  post: {}
})

const store = createStore(
  reducer,
  map(initialState),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/post/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Provider>
    )
  }
}

export default App;
