import React, { useEffect, useState, useRef } from "react";
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import MyModal from '../components/UI/MyModal/MyModal'

import PostFilter from "../components/Postfilter";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../components/API/PostService";
import { Loader } from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import getPageCount from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "./../hooks/useObserver";
import MySelect from "./../components/UI/select/MySelect";



function Posts() {

const [posts, setPosts] = useState([]);


const [filter, setFilter] = useState({sort: '', query: ''})
const [modal, setModal] = useState(false);
const [totalPages, setTotalPages] = useState(0);
const [limit, setLimit] = useState(10);
const [page, setPage] = useState(1);
const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
const lastElement = useRef();



const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const resp = await PostService.getAll(limit, page);
    setPosts([...posts, ...resp.data])
    const totalCount = resp.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
})


useObserver(lastElement, page < totalPages, isPostsLoading, ()=>{setPage(page + 1)})



useEffect(()=>{
    fetchPosts(limit, page);
}, [page, limit])

const createPost = (newPost) => {
    setPosts([...posts, newPost]);
}

const changePage = (page) => {
    setPage(page);
}

const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
}


return (
    <>
    <div className="App">

        <button onClick={fetchPosts}>GET POSTS</button>

        <MyButton style={{marginTop: '30px'}} onClick={(e) => setModal(true)}>
            Створити новий пост
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}></PostForm>
        </MyModal>
        

        <hr style={{margin: '15px 0'}}></hr>

        <PostFilter 
            filter={filter}
            setFilter={setFilter}
        />
        <MySelect 
            value={limit}
            onChange={(value) =>{setLimit(value)}}
            defaultValue="Кількість елементів на сторінці"
            options={[
                {value: 5, name: '5'},
                {value: 10, name: '10'},
                {value: 15, name: '15'},
                {value: 20, name: '20'},
                {value: -1, name: 'Показати все'},
            ]}
        />

        {postError && <h1>Помилка :( ${postError}</h1>}
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів"/>
        <div ref={lastElement} style={{background: 'rebeccapurple', height: 20, margin: '20px 0'}}></div>
        {isPostsLoading ? <Loader></Loader> : ''}

        {/* <Pagination 
        totalPages={totalPages}
        page={page}
        changePage={changePage}
        /> */}
        
    </div>
    </>
);
}

export default Posts;
    