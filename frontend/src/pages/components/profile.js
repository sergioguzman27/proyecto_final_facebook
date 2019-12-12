import React from 'react';
import CoverPage from '../../components/cover-page/cover-page';
import EditCoverPage from '../../components/edit-cover-page/edit-cover-page';
import Posts from '../../components/posts-layout/posts-layout';
import './css/profile.css';

function Profile(props) {
  return (
    <div className="container">
      {
        props.edit ?
          <EditCoverPage setRefFirstName={props.setRefFirstName} setRefLastName={props.setRefLastName}
          setRefUsername={props.setRefUsername} setRefPhoneNumber={props.setRefPhoneNumber}
          handleSubmitEdit={props.handleSubmitEdit} first_name={props.first_name}/>
          :
          <CoverPage id={props.id} username={props.username} email={props.email}
          first_name={props.first_name} last_name={props.last_name}
          phone_number={props.phone_number} total_posts={props.count} total_comments={props.comments}
          total_reactions={props.reactions} handleClickEdit={props.handleClickEdit}
          handleClickDeteleProfile={props.handleClickDeteleProfile}/>
      }
      <Posts profile={true} results={props.results} previous={props.previous}
      next={props.next} handleNext={props.handleNext} handlePrevious={props.handlePrevious}
      edit_post={props.edit_post} handleClickEditPost={props.handleClickEditPost}
      setRefTitle={props.setRefTitle} setRefDescription={props.setRefDescription}
      handleSubmitEditPost={props.handleSubmitEditPost} edit_post_id={props.edit_post_id}
      handleClickDeletePost={props.handleClickDeletePost} />
    </div>
  )
}

export default Profile;
