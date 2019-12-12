import React from 'react';
import Post from '../post-item/post';

function PostsLayout(props) {
  return (
    <div>
      {
        props.results &&
        props.results.map((item) => {
          return <Post key={item.id} title={item.title} description={item.description}
            date={item.created} username={item.user.username} last_name={item.user.last_name}
            first_name={item.user.first_name} id={item.id} comments={item.comments_post}
            likes={item.reactions_post} profile={props.profile} edit_post={props.edit_post}
            handleClickEditPost={props.handleClickEditPost} setRefTitle={props.setRefTitle}
            setRefDescription={props.setRefDescription} handleSubmitEditPost={props.handleSubmitEditPost}
            edit_post_id={props.edit_post_id} setRefComment={props.setRefComment} 
            handleClickComment={props.handleClickComment} handleInputsChange={props.handleInputsChange} 
            reactions_post={item.reactions_post} user_session={props.user_session}
            handleLike={props.handleLike} handleDisLike={props.handleDisLike}
            handleClickDeletePost={props.handleClickDeletePost}/>
        })
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

export default PostsLayout;
