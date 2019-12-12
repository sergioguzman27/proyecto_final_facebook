import React from 'react';
import './comment.css';

function CommentPost(props) {
  return (
    <div className="card">
      <div className="card-header">
        {props.first_name}  {props.last_name}
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p className="text-justify" >{props.comment}</p>
          <footer className="blockquote-footer">
            <i className="fa fa-user"></i>  {props.username}  
          <cite className="float-right" title="Source Title"><i className="fa fa-clock-o mr-2"></i>{props.date}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  )
}

export default CommentPost;
