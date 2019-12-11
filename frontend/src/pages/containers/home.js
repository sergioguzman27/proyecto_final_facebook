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
      console.log(res);
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

  handleNext = () => {
    const path = this.props.next.replace('http://localhost:8000/api/','')
    console.log('Next page');
    this.obtenerPosts(path);
  }

  handlePrevious = () => {
    const path = this.props.previous.replace('http://localhost:8000/api/','')
    console.log('Previous page');
    this.obtenerPosts(path);
  }

  handleClickPost = () => {
    event.preventDefault();
    console.log('Crear post')
    const body = {
      "title": this.inputTitle.value,
      "description": this.inputDescription.value
    }
    console.log('body ', body)
    this.crearPost(body);
  }

  setRefTitle = element => {
    this.inputTitle = element;
  }

  setRefDescription = element => {
    this.inputDescription = element;
  }

	render() {
		return (
			<Home results={this.props.results} username={this.props.username}
      previous={this.props.previous} next={this.props.next}
      handleNext={this.handleNext} handlePrevious={this.handlePrevious}
      setRefTitle={this.setRefTitle} setRefDescription={this.setRefDescription}
      handleClickPost = {this.handleClickPost}/>
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
