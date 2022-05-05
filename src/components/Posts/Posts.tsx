import { PostType } from "../redux/postsReducer"

interface PropType {
    posts: PostType[]
}

const Posts: React.FC<PropType> = ({posts}) => {

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
            {mapPosts}
        </tbody>
    )
}

export default Posts