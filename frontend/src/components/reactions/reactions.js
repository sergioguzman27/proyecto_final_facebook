import React from 'react';
import './reactions.css';
function ReactionsPost(props) {
  return (
    <li className="list-group-item">
      {
        props.like ?
        <i className="fa fa-thumbs-o-up icon-reaction mr-3"/>
        :
        <i className="fa fa-thumbs-o-down icon-reaction mr-3"/>
      }
      {props.first_name}  {props.last_name}
    </li>
  )
}

export default ReactionsPost;
