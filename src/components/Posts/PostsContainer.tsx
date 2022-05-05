import './style.scss'
import { connect } from "react-redux";
import { getPostsTC, PostType } from "../redux/postsReducer";
import { appStateType } from '../redux/redux-store';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import Posts from './Posts';

interface PropsType {
    posts: PostType[],
    isFetching: boolean,
    search: string,
    getPostsTC: () => void
}

const PostsContainer: React.FC<PropsType> = ({ posts, isFetching, search, getPostsTC }) => {


    useEffect(() => {
        getPostsTC()
    }, [])

    const [sortType, setSortType] = useState("asc")
    const [sortKey, setSortKey] = useState<"id" | "title" | "body">("id")

    const sortPosts = () =>{
        let visiblePosts = posts.slice(0, 10).filter(post => post.body.includes(search) || post.title.includes(search))
    
        switch (sortKey) {
            case "id":
                if (sortType == "asc") {
                    visiblePosts.sort((a, b) => a[sortKey] - b[sortKey])
                } else {
                    visiblePosts.sort((a, b) => b[sortKey] - a[sortKey])
                }
    
                break
            default:
                if (sortType == "asc") {
                    visiblePosts.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
                } else {
                    visiblePosts.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
                }
                break
        }
        return visiblePosts
    }

    const theadHandler = (e: any) => {
        if (sortType == "asc") {
            setSortType("dsc")
        } else {
            setSortType("asc")
        }
        setSortKey(e.target.dataset.sort)
    }

    
    return (
        <>
            {isFetching ? <Preloader></Preloader> : null}
            <table className="main__table table">
                <thead className="table__title" onClick={theadHandler}>
                    <tr>
                        <td data-sort="id">ID</td>
                        <td data-sort="title">Заголовок</td>
                        <td data-sort="body">Описание</td>
                    </tr>
                </thead>
                <Posts posts={sortPosts()}></Posts>
            </table>
        </>
    )
}

const MapStateToProps = (state: appStateType) => {
    return {
        posts: state.posts.posts,
        isFetching: state.posts.isFetching,
        search: state.posts.search,
    }
}

export default connect(MapStateToProps, { getPostsTC })(PostsContainer)