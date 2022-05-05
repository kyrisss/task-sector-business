import axios from "axios"
import { Dispatch } from "redux"

export interface PostType {
    userId: number,
    id: number,
    title: string,
    body: string
}


export interface initialPostsStoreType {
    posts: PostType[],
    isFetching: boolean,
    search: string,
    total: number,
    currentPage: number,
    itemsOnPage: number
}

let initialStore: initialPostsStoreType = {
    posts: [],
    isFetching: true,
    search: '',
    total: 0,
    currentPage: 1,
    itemsOnPage: 10
}

type actionType = setPostsACType | setFetchingACType | setSearchACType | setCurrentPageACType | setTotalACType;

const profileReducer = (state: initialPostsStoreType = initialStore, action: actionType): initialPostsStoreType => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.data,
                total: action.data.length

            }
        case "SET_TOTAL":
            return {
                ...state,
                total: action.data

            }
        case "SET_FETCHING":
            return {
                ...state,
                isFetching: action.data
            }
        case "SET_SEARCH":
            return {
                ...state,
                search: action.data
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.data
            }
        default:
            return state;
    }

}

interface setPostsACType {
    type: 'SET_POSTS'
    data: PostType[]
}

export const SET_POSTS = (data: PostType[]): setPostsACType => {
    return {
        type: 'SET_POSTS',
        data
    }
}

interface setFetchingACType {
    type: 'SET_FETCHING'
    data: boolean
}

export const SET_FETCHING = (data: boolean): setFetchingACType => {
    return {
        type: 'SET_FETCHING',
        data
    }
}

interface setSearchACType {
    type: 'SET_SEARCH'
    data: string
}

export const SET_SEARCH = (data: string): setSearchACType => {
    return {
        type: 'SET_SEARCH',
        data
    }
}

interface setCurrentPageACType {
    type: 'SET_CURRENT_PAGE'
    data: number
}

export const SET_CURRENT_PAGE = (data: number): setCurrentPageACType => {
    return {
        type: 'SET_CURRENT_PAGE',
        data
    }
}
interface setTotalACType {
    type: 'SET_TOTAL'
    data: number
}

export const SET_TOTAL = (data: number): setTotalACType => {
    return {
        type: 'SET_TOTAL',
        data
    }
}







export const getPostsTC = () => {
    return (dispatch: Dispatch<actionType>) => {
        dispatch(SET_FETCHING(true))
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                dispatch(SET_POSTS(response.data));
                dispatch(SET_TOTAL(response.data.length));
                dispatch(SET_FETCHING(false))
            })
    }
}


export default profileReducer;