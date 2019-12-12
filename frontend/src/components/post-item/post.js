import React from 'react';
import EditPost from '../edit-post/edit-post';
import NewComment from '../new-comment/comment';
import { Link } from 'react-router-dom';
import './post.css';

function encontrar(array, username) {
  for (const item of array) {
    if (item.user.username === username) return item
  }
  return null;
}

function Post(props) {
  // let item = null;
  let item = encontrar(props.reactions_post, props.user_session);
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
            {
              props.profile &&
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                  <div className="h6 dropdown-header">Opciones</div>
                  <a className="dropdown-item" onClick={(event) => { props.handleClickEditPost(props.id) }}>Editar</a>
                  <a className="dropdown-item" onClick={(event) => { props.handleClickDeletePost(props.id) }}>Eliminar</a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {props.date}</div>
        <Link to={`/post/${props.id}`} className="card-link">
          <h5 className="card-title">{props.title}</h5>
        </Link>
        <p className="card-text text-justify">{props.description}</p>
      </div>
      {
        !props.profile ?
          <div className="card-footer">
            {
              item != null ?
                <div>
                  <a href="#" onClick={(event) => { props.handleLike(item.like, props.id) }}
                    className={item.like ? 'card-link2' : 'card-link1'}><i className="fa fa-thumbs-o-up"></i> Me gusta</a>
                  <a href="#" onClick={(event) => { props.handleDisLike(!item.like, props.id) }}
                    className={item.like ? 'card-link1' : 'card-link2'}><i className="fa fa-thumbs-o-down"></i> No me gusta</a>
                  <p className="float-right ml-3"><i className="fa fa-thumbs-o-up"></i> {likes}</p>
                  <p className="float-right ml-3"><i className="fa fa-thumbs-o-down"></i> {dislikes}</p>
                  <p className="float-right ml-3"><i className="fa fa-comment"></i> {comments}</p>
                </div>
                :
                <div>
                  <a href="#" onClick={(event) => { props.handleLike(false, props.id) }}
                    className="card-link1"><i className="fa fa-thumbs-o-up"></i>  Me gusta</a>
                  <a href="#" onClick={(event) => { props.handleDisLike(false, props.id) }}
                    className="card-link1"><i className="fa fa-thumbs-o-down"></i>  No me gusta</a>
                  <p className="float-right ml-3"><i className="fa fa-thumbs-o-up"></i> {likes}</p>
                  <p className="float-right ml-3"><i className="fa fa-thumbs-o-down"></i> {dislikes}</p>
                  <p className="float-right ml-3"><i className="fa fa-comment"></i> {comments}</p>
                </div>
            }

            <div>
              <NewComment setRefComment={props.setRefComment} handleClickComment={props.handleClickComment}
                id={props.id} handleInputsChange={props.handleInputsChange} />
            </div>
          </div>
          :
          <div className="card-footer">
            <p className="float-right ml-3"><i className="fa fa-thumbs-o-up"></i> {likes}</p>
            <p className="float-right ml-3"><i className="fa fa-thumbs-o-down"></i> {dislikes}</p>
            <p className="float-right ml-3"><i className="fa fa-comment"></i> {comments}</p>
            {
              props.edit_post && props.edit_post_id == props.id &&
              <EditPost setRefTitle={props.setRefTitle} setRefDescription={props.setRefDescription}
                handleSubmitEditPost={props.handleSubmitEditPost} id={props.id} />
            }
          </div>
      }
    </div>
  )
}

export default Post;
