import React, { Component } from 'react';
import Profile from '../components/profile';
import { connect } from 'react-redux';
import { api } from '../../utils/api';
import * as actions from '../../utils/actions/actions';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';

class ProfileContainer extends Component {

  state = {
    edit: false,
    edit_post: false,
    edit_post_id: 0
  }

  constructor(props) {
    super(props);
  }

  obtenerUsuario(id) {
    api.get(`users/${id}/`, true).then((res) => {
      console.log(res);
      this.props.actions.get_user(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  obtenerPosts(path) {
    api.get(path, true).then((res) => {
      console.log(res);
      this.props.actions.get_posts(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  obtenerResumenPerfil() {
    api.get('posts/report/', true).then((res) => {
      console.log(res);
      this.props.actions.get_report(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  eliminarUsuario(id) {
    api.eliminar(`users/${id}/`, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Te has salido de Facebook :(',
      })
      this.props.history.replace('/login', {});
    }).catch((error) => {
      let mensaje = '';
      if (error.menssage_error) {
        mensaje = error.menssage_error;
      } else {
        mensaje = error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  editarPerfil(body, id) {
    api.put(`users/${id}/`, body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado la informacion',
      })
      this.obtenerUsuario(id);
      this.setState({
        edit: false
      });
    }).catch((error) => {
      let mensaje = '';
      if (error.menssage_error) {
        mensaje = error.menssage_error;
      } else {
        mensaje = error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  editarPost(body, id) {
    api.put(`posts/${id}/`, body, true).then((res) => {
      // console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado el post',
      })
      this.obtenerPosts('posts/user/');
      this.setState({
        edit_post: false,
        edit_post_id: 0
      });
    }).catch((error) => {
      // console.error(error);
      let mensaje = '';
      if (error.menssage_error) {
        mensaje = error.menssage_error;
      } else {
        mensaje = error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  eliminarPost(id) {
    api.eliminar(`posts/${id}/`, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado el post',
      })
      this.obtenerPosts('posts/user/');
    }).catch((error) => {
      // console.error(error);
      let mensaje = '';
      if (error.menssage_error) {
        mensaje = error.menssage_error;
      } else {
        mensaje = error[Object.keys(error)[0]][0]
      }
      Swal.fire(
        'Error',
        mensaje,
        'error'
      )
    });
  }

  componentDidMount() {

    if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null') {
      this.props.history.replace('/login', {});
    } else {
      const id = localStorage.getItem('id_user');
      this.obtenerUsuario(id);
      this.obtenerResumenPerfil();
      this.obtenerPosts('posts/user/');
    }
  }

  handleNext = () => {
    const path = this.props.next.replace('http://localhost:8000/api/', '')
    this.obtenerPosts(path);
  }

  handlePrevious = () => {
    const path = this.props.previous.replace('http://localhost:8000/api/', '')
    this.obtenerPosts(path);
  }

  handleClickEditProfile = () => {
    this.setState({
      edit: true
    });
    // Falta colocar los datos iniciales
  }

  handleClickDeteleProfile = () => {
    const id = localStorage.getItem('id_user');
    Swal.fire({
      title: 'Estas seguro que quieres eliminar tu cuenta?',
      text: "No hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.eliminarUsuario(id);
      }
    })
  }

  handleClickEditPost = (id) => {
    if (this.state.edit_post === true) {
      this.setState({
        edit_post: false,
        edit_post_id: 0
      });
    } else {
      this.setState({
        edit_post: true,
        edit_post_id: id
      });
    }
  }

  handleSubmitEditProfile = () => {
    event.preventDefault();
    const id = localStorage.getItem('id_user');
    const body = {
      first_name: this.inputFirstName.value,
      last_name: this.inputLastName.value,
      username: this.inputUsername.value,
      phone_number: this.inputPhoneNumber.value
    }
    this.editarPerfil(body, id);
  }

  handleSubmitEditPost = (id) => {
    event.preventDefault();
    const body = {
      title: this.inputTitle.value,
      description: this.inputDescription.value
    }
    this.editarPost(body, id);
  }

  handleClickDeletePost = (id) => {
    console.log('post ', id)
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta publicacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.eliminarPost(id);
      }
    })
  }

  // Inputs para editar el perfil
  setRefFirstName = element => {
    this.inputFirstName = element;
  }

  setRefLastName = element => {
    this.inputLastName = element;
  }

  setRefUsername = element => {
    this.inputUsername = element;
  }

  setRefPhoneNumber = element => {
    this.inputPhoneNumber = element;
  }

  // Inputs para editar el post
  setRefTitle = element => {
    this.inputTitle = element;
  }

  setRefDescription = element => {
    this.inputDescription = element;
  }

  render() {
    return (
      <Profile edit={this.state.edit} id={this.props.id} username={this.props.username} email={this.props.email}
        first_name={this.props.first_name} last_name={this.props.last_name} phone_number={this.props.phone_number}
        results={this.props.results} previous={this.props.previous} next={this.props.next}
        handleNext={this.handleNext} handlePrevious={this.handlePrevious} count={this.props.count}
        comments={this.props.comments} reactions={this.props.reactions} handleClickEdit={this.handleClickEditProfile}
        setRefFirstName={this.setRefFirstName} setRefLastName={this.setRefLastName} setRefUsername={this.setRefUsername}
        setRefPhoneNumber={this.setRefPhoneNumber} handleSubmitEdit={this.handleSubmitEditProfile}
        edit_post={this.state.edit_post} handleClickEditPost={this.handleClickEditPost}
        setRefTitle={this.setRefTitle} setRefDescription={this.setRefDescription}
        handleSubmitEditPost={this.handleSubmitEditPost} edit_post_id={this.state.edit_post_id}
        handleClickDeletePost={this.handleClickDeletePost} handleClickDeteleProfile={this.handleClickDeteleProfile} />
    )
  }
}

function mapStateToProps(state, props) {
  // console.log(state.get('data').get('works'));
  return {
    id: state.get('user').get('id'),
    username: state.get('user').get('username'),
    email: state.get('user').get('email'),
    first_name: state.get('user').get('first_name'),
    last_name: state.get('user').get('last_name'),
    phone_number: state.get('user').get('phone_number'),
    results: state.get('posts').get('results'),
    previous: state.get('posts').get('previous'),
    next: state.get('posts').get('next'),
    count: state.get('posts').get('count'),
    comments: state.get('user').get('comments'),
    reactions: state.get('user').get('reactions'),
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
