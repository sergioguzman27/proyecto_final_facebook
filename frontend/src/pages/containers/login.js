import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { api } from '../../utils/api';
import Login from '../components/login';

import * as actions from '../../utils/actions/actions';
import Swal from 'sweetalert2';

class LoginContainer extends Component {

  login(body) {
    // console.log(body);
    api.post('users/login/', body).then((res) => {
      // console.log(res);
      const resp = {
        username: res.user.username,
        email: res.user.email,
        token: res.access_token,
        id: res.user.id
      }
      localStorage.setItem('token', resp.token);
      localStorage.setItem('username', resp.username);
      localStorage.setItem('id_user', resp.id);
      this.props.actions.login(resp)
      Swal.fire({
        icon: 'success',
        title: 'Login',
      })
      this.props.history.replace('/', resp);
    }).catch((error) => {
      let mensaje = '';
      if(error.menssage_error){
        mensaje = error.menssage_error; 
      }else{
        mensaje = error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  handleClick = () => {
    event.preventDefault();
    const body = {
      email: this.inputEmail.value,
      password: this.inputPassword.value
    }
    this.login(body);
  }

  handleClickSignup = () => {
    this.props.history.replace('/signup', {});
  }

  setRefEmail = element => {
    this.inputEmail = element;
  }

  setRefPassword = element => {
    this.inputPassword = element;
  }

  render() {
    return (
      <Login setRefEmail={this.setRefEmail} setRefPassword={this.setRefPassword}
        handleSubmit={this.handleClick} handleClickSignup={this.handleClickSignup}/>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer);
