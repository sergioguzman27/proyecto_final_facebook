import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { api } from '../../utils/api';
import * as actions from '../../utils/actions/actions';
import Post from '../components/post';

class PostDetailConteiner extends Component {

  state = {
    comments: true
  }

  obtenerPost(id) {
    api.get(`posts/${id}/complete/`, true).then((res) => {
      console.log(res);
      this.props.actions.get_post(res);
    }).catch((error) => {
      console.error(error);
    });
  }

  changeNavPost = (changeNav) => {
    this.setState({
      comments: changeNav
    });
  }


  componentDidMount() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null') {
      this.props.history.replace('/login', {});
    } else {
      this.obtenerPost(this.props.id);
    }
  }

  render() {
    return (
      <Post data={this.props.data} changeNavPost={this.changeNavPost}
      navPost={this.state.comments}/>
    )
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.id;
  console.log('id', id)
  return {
    id: id,
    data: state.get('post').get('data'),
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailConteiner);
