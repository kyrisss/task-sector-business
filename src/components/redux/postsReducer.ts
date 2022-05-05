import axios from "axios"
import { Dispatch } from "redux"

export interface PostType{
    userId: number,
    id: number,
    title: string,
    body: string
}


export interface initialPostsStoreType {
    posts: PostType[],
    isFetching: boolean,
    search: string
}

let initialStore: initialPostsStoreType = {
    posts: [],
    isFetching: false,
    search: ''
}

type actionType = setPostsACType | toggleFetchingACType | setSearchACType;

const profileReducer = (state: initialPostsStoreType = initialStore, action: actionType): initialPostsStoreType => {

    switch (action.type) {
        case "SET_POSTS":
            return {
                ...state,
                posts: action.data,
            }
        case "TOGGLE_FETCHING":
            return {
                ...state,
                isFetching: !state.isFetching
                }
        case "SET_SEARCH":
            return {
                ...state,
                search: action.data
            }
        default:
            return state;
    }

}

export interface setPostsACType {
    type: 'SET_POSTS'
    data: PostType[]
}

export const SET_POSTS = (data: PostType[]): setPostsACType => {
    return {
        type: 'SET_POSTS',
        data
    }
}

export interface toggleFetchingACType {
    type: 'TOGGLE_FETCHING'
}

export const TOGGLE_FETCHING = (): toggleFetchingACType => {
    return {
        type: 'TOGGLE_FETCHING',
    }
}

export interface setSearchACType {
    type: 'SET_SEARCH'
    data: string
}

export const SET_SEARCH = (data: string): setSearchACType => {
    return {
        type: 'SET_SEARCH',
        data
    }
}




export const getPostsTC = () => {
    return (dispatch: Dispatch<actionType>) => {
        dispatch(TOGGLE_FETCHING())
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                dispatch(SET_POSTS(response.data));
                dispatch(TOGGLE_FETCHING())
            })
    }
}


export default profileReducer;