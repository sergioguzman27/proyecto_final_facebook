import React from 'react';
import Post from '../post-item/post';

function PostsLayout(props) {
  console.log('previos ', props.previous)
  console.log('next ', props.next)
  return (
    <div>
      {
        props.results &&
        props.results.map((item) => {
          return <Post key={item.id} title={item.title} description={item.description}
            date={item.created} username={item.user.username} last_name={item.user.last_name}
            first_name={item.user.first_name} id={item.id} comments={item.comments_post}
            likes={item.reactions_post} />
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
                  <a className="page-link" aria-disabled="true">Siguiente</a>
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
