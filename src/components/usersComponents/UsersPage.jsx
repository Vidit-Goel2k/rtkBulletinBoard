import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { selectUserById } from "../../features/users/usersSlice"
import { selectAllPosts, selectPostByUser } from './../../features/posts/postsSlice';



const UsersPage = () => {

    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    // everytime an action is dispatched useSelector runs
    // everytime we return a new array of posts because filter returns a new array
    // returning a new array everytime causes the userPage component re-render
    const postsForUser = useSelector((state) => {
        return selectPostByUser(state, Number(userId))
    })

    const postTitles = postsForUser.map(post => (
        <li key={post.id}> 
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>{postTitles}</ol>  
        </section>
    )
}

export default UsersPage