import React from 'react';
import CommentPost from '../../components/comments/comment';
import ReactionsPost from '../../components/reactions/reactions';

function PostDetail(props) {
  if (props.data) {
    let date = new Date(props.data.created);
    return (
      <div className="container">
        <div className="card gedf-card mt-3">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img className="rounded-circle" width="45" src="../../../assets/user.png" alt="" />
                </div>
                <div className="ml-2">
                  <div className="h5 m-0">{props.data.user.username}</div>
                  <div className="h7 text-muted">{props.data.user.last_name} | {props.data.user.first_name}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i> {date.toDateString()}</div>
            <a className="card-link" href="#">
              <h5 className="card-title">{props.data.title}</h5>
            </a>
            <p className="card-text text-justify">{props.data.description}</p>
          </div>
          <div className="card-footer">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className={props.navPost ? 'nav-link active' : 'nav-link'} href="#"
                      onClick={(event) => { props.changeNavPost(true) }} >Comentarios</a>
                  </li>
                  <li className="nav-item">
                    <a className={props.navPost ? 'nav-link' : 'nav-link active'} href="#"
                      onClick={(event) => { props.changeNavPost(false) }}>Reacciones</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {
                  props.navPost ?
                    props.data.comments_post.map((item) => {
                      let date = new Date(item.created);
                      return <CommentPost key={item.id} first_name={item.user.first_name}
                        last_name={item.user.last_name} comment={item.comment} date={date.toDateString()}
                        username={item.user.username} />
                    })
                    :
                    <ul className="list-group list-group-flush">
                      {
                        props.data.reactions_post.map((item) => {
                          return <ReactionsPost key={item.id} like={item.like}
                          first_name={item.user.first_name} last_name={item.user.last_name}/>
                        })
                      }
                    </ul>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div></div>
  )

}

export default PostDetail;
