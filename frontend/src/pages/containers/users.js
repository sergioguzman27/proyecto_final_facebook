import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { api } from '../../utils/api';
import * as actions from '../../utils/actions/actions';
import Swal from 'sweetalert2';
import Users from '../components/users';

class UsersContainer extends Component {

  obtenerUsuarios(path) {
    api.get(path, true).then((res) => {
      console.log(res);
      this.props.actions.get_users(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null') {
      this.props.history.replace('/login', {});
    } else {
      this.obtenerUsuarios('users/');
    }
  }

  handleNext = () => {
    const path = this.props.next.replace('http://localhost:8000/api/','')
    this.obtenerUsuarios(path);
  }

  handlePrevious = () => {
    const path = this.props.previous.replace('http://localhost:8000/api/','')
    this.obtenerUsuarios(path);
  }

  render() {
    return(
      <Users results={this.props.results} username={this.props.username}
      previous={this.props.previous} next={this.props.next}
      handleNext={this.handleNext} handlePrevious={this.handlePrevious}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    username: localStorage.getItem('username'),
    results: state.get('users').get('results'),
    previous: state.get('users').get('previous'),
    next: state.get('users').get('next'),
  }

}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
