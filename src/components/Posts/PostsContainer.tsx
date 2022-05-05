import './style.scss'
import { connect } from "react-redux";
import { getPostsTC, PostType, SET_CURRENT_PAGE, SET_TOTAL } from "../redux/postsReducer";
import { appStateType } from '../redux/redux-store';
import { useEffect, useState } from 'react';
import Posts from './Posts';
import Paginator from '../Paginator/Paginator';

interface PropsType {
    posts: PostType[]
    search: string
    itemsOnPage: number
    currentPage: number,
    total: number
    getPostsTC: () => void
    SET_TOTAL: (n: number) => void
    SET_CURRENT_PAGE: (page: number) => void
}

const PostsContainer: React.FC<PropsType> = ({ posts,search, currentPage, itemsOnPage, total, getPostsTC, SET_TOTAL, SET_CURRENT_PAGE }) => {


    useEffect(() => {
        getPostsTC()
    }, [])

    useEffect(() => {
        SET_TOTAL(filterPosts.length)
    }, [search])

    const [sortType, setSortType] = useState("asc")
    const [sortKey, setSortKey] = useState<"id" | "title" | "body">("id")
    const leftBorder = (currentPage - 1) * itemsOnPage
    const rightBorder = currentPage * itemsOnPage

    const filterPosts = posts.filter(post => post.body.includes(search) || post.title.includes(search) || String(post.id).includes(search))
    
    const sortPosts = () => {
        const visiblePosts = filterPosts.slice(leftBorder, rightBorder)
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

    const sort = sortPosts()    

    return (
        <>
            <table className="main__table table">
                <thead className="table__title" onClick={theadHandler}>
                    <tr>
                        <td className={sortType == 'dsc' && sortKey == "id" ?  "table__title_sort-up": "table__title_sort-down"} data-sort="id">ID</td>
                        <td className={sortType == 'dsc' && sortKey == "title"? "table__title_sort-up": "table__title_sort-down"} data-sort="title">Заголовок</td>
                        <td className={sortType == 'dsc' && sortKey == "body"? "table__title_sort-up": "table__title_sort-down"} data-sort="body">Описание</td>
                    </tr>
                </thead>
                <Posts posts={sort}></Posts>
            </table>
            {sort.length ? <Paginator total={total} currentPage={currentPage} itemsOnPage={itemsOnPage} SET_CURRENT_PAGE={SET_CURRENT_PAGE}></Paginator> : null}
        </>
    )
}

const MapStateToProps = (state: appStateType) => {
    return {
        posts: state.posts.posts,
        search: state.posts.search,
        currentPage: state.posts.currentPage,
        itemsOnPage: state.posts.itemsOnPage,
        total: state.posts.total,

    }
}

export default connect(MapStateToProps, { getPostsTC, SET_TOTAL, SET_CURRENT_PAGE })(PostsContainer)