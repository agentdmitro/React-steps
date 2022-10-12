import React from 'react'
import MyButton from "./UI/button/MyButton";
import { useHistory } from "react-router-dom";

export function Post(props){

    const router = useHistory()


    return(
        <div className="post">
        <div className="post__content">
            <div className="post__header"><strong>{props.post.id}.</strong> <h4 className='post__title'>{props.post.title}</h4></div>
            <div>
                {props.post.body}
            </div>
        </div>
        <div className="post__btns">
            <MyButton onClick={() => router.push(`/posts/${props.post.id}`)}>Відкрии</MyButton>

            <MyButton onClick={() => props.remove(props.post)}>Видалити</MyButton>
        </div>
        </div>
    )
}

export default Post