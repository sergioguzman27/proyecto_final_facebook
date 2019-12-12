import React from 'react';
import Comment from '../../components/comment-log/comment';

function CommentsLog(props) {
  return (
    <div className="container">
      {
        props.results &&
        <ul className="list-group my-4">
          {
            props.results.map((item) => {
              return <Comment key={item.id} id={item.id} created={item.created} comment={item.comment}
                comments_post={item.comments_post} first_name={item.user.first_name} last_name={item.user.last_name}
                handleClickDelete={props.handleClickDelete} handleClickEdit={props.handleClickEdit}
                edit_comment={props.edit_comment} edit_comment_id={props.edit_comment_id}
                handleInputsChange={props.handleInputsChange} handleSubmitEdit={props.handleSubmitEdit} />
            })
          }
        </ul>
      }
      {
        props.results &&
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {
              props.previous == null ?
                <li className="page-item disabled">
                  <a className="page-link" aria-disabled="true">Anterior</a>
                </li>
                :
                <li className="page-item">
                  <a className="page-link" onClick={props.handlePrevious}>Anterior</a>
                </li>
            }
            {
              props.next == null ?
                <li className="page-item disabled">
                  <a className="page-link" onClick={props.handleNext} aria-disabled="true">Siguiente</a>
                </li>
                :
                <li className="page-item">
                  <a className="page-link" onClick={props.handleNext}>Siguiente</a>
                </li>
            }

          </ul>
        </nav>
      }
    </div>

  )
}

export default CommentsLog;
