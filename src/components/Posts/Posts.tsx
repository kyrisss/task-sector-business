import { PostType } from "../redux/postsReducer"

interface PropType {
    posts: PostType[]
}

const Posts: React.FC<PropType> = ({ posts }) => {

    const mapPosts = posts.map(post => {
        return (
            <tr className="posts__item" key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
            </tr>
        )
    })

    return (
        <tbody className="table__items posts">
            {posts.length ? mapPosts :
                <tr className="posts__error" >
                    <td colSpan={3}>Posts not found</td>
                </tr>
            }
        </tbody>
    )
}

export default Posts