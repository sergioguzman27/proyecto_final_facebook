import React, {Component} from 'react';
import Signup from '../components/signup';
import { api } from '../../utils/api';
import Swal from 'sweetalert2';

class SignupContainer extends Component {

  handleSignup = () => {
    event.preventDefault();
    this.registrarUsuario(this.state);
  }

  registrarUsuario(body) {
    api.post('users/', body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
      })
      this.props.history.replace('/login', {});
    }).catch((error) => {
      let mensaje='';
      if(error.menssage_error){
        mensaje = error.menssage_error; 
      }else{
        mensaje = Object.keys(error)[0] + " " + error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  handleInputsChange= (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick = () => {
    this.props.history.replace('/login', {});
  }

  render () {
    return (
      <Signup handleSignup={this.handleSignup}
      handleInputsChange={this.handleInputsChange}
      handleClick={this.handleClick}/>
    )
  }
}

export default SignupContainer;
