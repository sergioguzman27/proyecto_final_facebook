import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/home';
import { api } from '../../utils/api';
import * as actions from '../../utils/actions/actions';
import Swal from 'sweetalert2';

class HomeContainer extends Component {

	constructor(props) {
    super(props);
    //this.obtenerUsuarios();
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null') {
      this.props.history.replace('/login', {});
    }
  }

	componentDidMount() {
		if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null') {
      this.props.history.replace('/login', {});
    } else {
      this.obtenerPosts('posts/all/');
    }
  }
  
  obtenerPosts(path) {
    api.get(path, true).then((res) => {
      console.log(res);
      this.props.actions.get_posts(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  crearPost(body) {
    api.post('posts/', body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Publicacion creado',
      })
      this.obtenerPosts('posts/all/');
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la publicacion',
      })
    });
  }

  crearComentario(body) {
    api.post('comments/', body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Comentario creado',
      })
      this.obtenerPosts('posts/all/');
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el comentario',
      })
    });
  }

  eliminarReaccion(id) {
    const body = {
      post_id: id
    }
    api.post('reactions/remove_action/', body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Reaccion eliminada',
      })
      this.obtenerPosts('posts/all/');
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el comentario',
      })
    });
  }

  crearReaccion(id, like) {
    const body = {
      like: like,
      post_id: id
    }
    api.post('reactions/', body, true).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Reaccion agregada',
      })
      this.obtenerPosts('posts/all/');
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el comentario',
      })
    });
  }

  handleNext = () => {
    const path = this.props.next.replace('http://localhost:8000/api/','')
    this.obtenerPosts(path);
  }

  handlePrevious = () => {
    const path = this.props.previous.replace('http://localhost:8000/api/','')
    this.obtenerPosts(path);
  }

  handleClickPost = () => {
    event.preventDefault();
    const body = {
      "title": this.inputTitle.value,
      "description": this.inputDescription.value
    }
    this.crearPost(body);
    this.inputTitle.value = '';
    this.inputDescription.value = '';
  }

  handleClickComment = (id) => {
    event.preventDefault();
    console.log('comentario al post ', id);
    const name = `comment${id}`;
    const body = {
      comment: this.state[name],
      post_id: id
    }
    console.log(body);
    this.crearComentario(body);
    // this.inputComment.value = '';
  }

  handleLike = (activo, id) => {
    if (activo) {
      console.log('se eliminara el like al post ', id);
      this.eliminarReaccion(id);
    } else {
      console.log('Se dara like al post ', id);
      this.crearReaccion(id, true);
    }
  }

  handleDisLike = (activo, id) => {
    if (activo) {
      console.log('se eliminara el dislike al post', id);
      this.eliminarReaccion(id);
    } else {
      console.log('Se dara dislike al post', id);
      this.crearReaccion(id, false);
    }
  }

  handleInputsChange= (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log('valor ', value);
    // this.props.actions.create_user(name, value);
    this.setState({
      [name]: value
    });
  }

  setRefTitle = element => {
    this.inputTitle = element;
  }

  setRefDescription = element => {
    this.inputDescription = element;
  }

  setRefComment = element => {
    this.inputComment = element;
  }

	render() {
		return (
			<Home results={this.props.results} username={this.props.username}
      previous={this.props.previous} next={this.props.next}
      handleNext={this.handleNext} handlePrevious={this.handlePrevious}
      setRefTitle={this.setRefTitle} setRefDescription={this.setRefDescription}
      handleClickPost = {this.handleClickPost} setRefComment={this.setRefComment} 
      handleClickComment={this.handleClickComment} handleInputsChange={this.handleInputsChange}
      handleLike={this.handleLike} handleDisLike={this.handleDisLike} />
		)
	}
}

function mapStateToProps(state, props) {
  // console.log(state.get('data').get('works'));
  return {
    username: localStorage.getItem('username'),
    results: state.get('posts').get('results'),
    previous: state.get('posts').get('previous'),
    next: state.get('posts').get('next'),
  }

}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
