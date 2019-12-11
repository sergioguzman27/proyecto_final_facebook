import React from 'react';
import NewComment from '../new-comment/comment';
import './post.css';

function Post(props) {

  let comments = props.comments.length;
  let likes = props.likes.filter((item) => {
    return item.like
  }).length
  let dislikes = props.likes.filter((item) => {
    return !item.like
  }).length

  return (
    <div className="card gedf-card">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-2">
              <img className="rounded-circle" width="45" src="../../../assets/user.png" alt="" />
            </div>
            <div className="ml-2">
              <div className="h5 m-0">{props.username}</div>
              <div className="h7 text-muted">{props.last_name} | {props.first_name}</div>
            </div>
          </div>
          <div>
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-ellipsis-h"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                <div className="h6 dropdown-header">Opciones</div>
                <a className="dropdown-item" href="#">Editar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {props.date}</div>
        <a className="card-link" href="#">
          <h5 className="card-title">{props.title}</h5>
        </a>
        <p className="card-text text-justify">{props.description}</p>
      </div>
      <div className="card-footer">
        <div>
          <a href="#" className="card-link"><i className="fa fa-thumbs-o-up"></i> Me gusta</a>
          <a href="#" className="card-link"><i className="fa fa-thumbs-o-down"></i> No me gusta</a>
          <a href="#" className="card-link"><i className="fa fa-comment"></i> Comentar</a>
          <p className="float-right ml-3"><i className="fa fa-thumbs-o-up"></i> {likes}</p>
          <p className="float-right ml-3"><i className="fa fa-thumbs-o-down"></i> {dislikes}</p>
          <p className="float-right ml-3"><i className="fa fa-comment"></i> {comments}</p>
        </div>
        <div>
          <NewComment />
        </div>
      </div>
    </div>
  )
}

export default Post;
