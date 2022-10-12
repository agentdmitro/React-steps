import  React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import PostService from "./../components/API/PostService";
import { Loader } from "../components/UI/Loader/Loader";
import  {useFetching}  from "../hooks/useFetching";

function PostPage() {

    const params = useParams()
    const [post, setPost] = useState({});
    const [coms, setComs] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const resp = await PostService.getById(id);
        setPost(resp.data);
    })
    const [fetchComById, isComLoading, comError] = useFetching(async (id) => {
        const resp = await PostService.getComByPostId(id);
        setComs(resp.data);
    })
    

    useEffect(() => {
        fetchPostById(params.id);
        fetchComById(params.id);
    }, [])

    return (
        <div>
            <h1>пост ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                :  <><div style={{margin: '20px 0'}}>{post.id}.{post.title}</div> <p style={{margin: '20px 0'}}>{post.body}</p></>
            }
            <h1>Коментарі</h1>
            {isComLoading 
            ?
            <Loader></Loader>
            :
            <>
            <div>{coms.map(com => 
                <div key={com.id} style={{margin: '20px 0'}}>
                    <h5>{com.email}</h5>
                    <div>{com.body}</div>
                </div>
                )}
            </div>
            </>
            }
        </div>
    )

}
export default PostPage;