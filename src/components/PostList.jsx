import React from 'react'
import Post from './Post'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

export function PostList({posts, title, remove}){
    
    if(!posts.length){
        return(
            <h1 style={{textAlign: 'center'}}>Постів не знайдено</h1>
        )
    }

    return(
        <div>
            <h1 style={{textAlign: 'center', marginTop: '20px'}}>{title} {posts.length}</h1>

            <TransitionGroup>
            {posts.map((post, index) =>
                <CSSTransition
                key={post.id}
                timeout={500}
                classNames="post"
                >
                        <Post remove={remove} post={post} number={index + 1} ></Post>
                </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    )
}

export default PostList;