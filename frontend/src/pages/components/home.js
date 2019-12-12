import React from 'react';
import Posts from '../../components/posts-layout/posts-layout';
import NewPost from '../../components/new-post/new-post';

function Home(props) {
	return (
		<div className="container">
			<h2>Holaa {props.username}</h2>
			<div>
				<NewPost setRefTitle={props.setRefTitle} setRefDescription={props.setRefDescription}
				handleClickPost={props.handleClickPost}/>
			</div>
			<Posts edit_post={false} results={props.results} previous={props.previous} next={props.next}
			handleNext={props.handleNext} handlePrevious={props.handlePrevious} profile={false}
			setRefComment={props.setRefComment} handleClickComment={props.handleClickComment}
			handleInputsChange={props.handleInputsChange} user_session={props.username} 
			handleLike={props.handleLike} handleDisLike={props.handleDisLike}/>
		</div>
	)
}

export default Home;
