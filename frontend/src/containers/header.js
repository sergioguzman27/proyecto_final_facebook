import React, { Component } from 'react';
import Header from '../components/header/header';
import Swal from 'sweetalert2';
import { api } from '../utils/api';
import { withRouter } from 'react-router';

class HeaderContainer extends Component {

  state = {
    token: localStorage.getItem('token')
  }

  componentDidMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
  }

  logout() {
    api.post('users/logout/', null, true).then((res) => {
      localStorage.setItem('token', null);
      localStorage.setItem('username', null);
      Swal.fire({
        icon: 'success',
        title: 'Logout',
      })
      this.props.history.replace('/login', null);
    }).catch((error) => {
      console.error(error);
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

  handleLogout = (event) => {
    console.log('Logout');
    this.logout();
  }

  render() {
    return (
      <Header handleLogout={this.handleLogout} token={this.state.token} />
    )
  }
}

export default withRouter(HeaderContainer);
