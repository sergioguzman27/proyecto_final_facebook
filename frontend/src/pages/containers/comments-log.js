import React, {Component} from 'react';
import Comments from '../components/comments-log';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { api } from '../../utils/api';
import * as actions from '../../utils/actions/actions';
import Swal from 'sweetalert2';

class CommentsContainer extends Component {

  state = {
    edit: false,
    edit_comment: false,
    edit_comment_id: 0
  }

  obtenerComentarios(path) {
    api.get(path, true).then((res) => {
      console.log(res);
      this.props.actions.get_comments(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  editarComentario(body, id) {
    api.put(`comments/${id}/`, body, true).then((res) => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Se ha editado el comentario',
      })
      this.obtenerComentarios('comments/user/');
      this.setState({
        edit_comment: false,
        edit_comment_id: 0
      });
    }).catch((error) => {
      console.error(error);
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

  eliminarComentario(id) {
    api.eliminar(`comments/${id}/`, true).then((res) => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Se ha eliminado el comentario',
      })
      this.obtenerComentarios('comments/user/');
    }).catch((error) => {
      console.error(error);
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
      this.obtenerComentarios('comments/user/');
    }
  }

  handleNext = () => {
    const path = this.props.next.replace('http://localhost:8000/api/','')
    this.obtenerComentarios(path);
  }

  handlePrevious = () => {
    const path = this.props.previous.replace('http://localhost:8000/api/','')
    this.obtenerComentarios(path);
  }

  handleClickDelete = (id) => {
    console.log('post ', id)
    Swal.fire({
      title: 'Estas seguro que quieres eliminar este comentario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.eliminarComentario(id);
      }
    })
  }

  handleClickEdit = (id) => {
    if (this.state.edit_comment === true) {
      this.setState({
        edit_comment: false,
        edit_comment_id: 0
      });
    } else {
      this.setState({
        edit_comment: true,
        edit_comment_id: id
      });
    }
  }

  handleInputsChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log('valor ', value);
    // this.props.actions.create_user(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSubmitEdit = (id) => {
    event.preventDefault();
    console.log('editar comentario ', id);
    const name = `comment${id}`;
    const body = {
      comment: this.state[name]
    }
    console.log(body);
    this.editarComentario(body, id);
  }

  render() {
    return (
      <Comments results={this.props.results} username={this.props.username}
      previous={this.props.previous} next={this.props.next}
      handleNext={this.handleNext} handlePrevious={this.handlePrevious}
      handleClickDelete={this.handleClickDelete} handleClickEdit={this.handleClickEdit}
      edit_comment={this.state.edit_comment} edit_comment_id={this.state.edit_comment_id}
      handleInputsChange={this.handleInputsChange} handleSubmitEdit={this.handleSubmitEdit} />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    username: localStorage.getItem('username'),
    results: state.get('comments').get('results'),
    previous: state.get('comments').get('previous'),
    next: state.get('comments').get('next'),
  }

}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
