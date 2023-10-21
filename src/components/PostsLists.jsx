import { useSelector } from "react-redux"
import { selectAllPosts } from "../features/posts/postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionBtns from "./ReactionBtns"


const PostsLists = () => {

    const posts = useSelector(selectAllPosts)

    // slice creates shallow copy of posts array
    // localeCompare finds out the bigger among two

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{ post.content.substring(0,100) }</p>
            <p className="postCredit">
                <PostAuthor userId = {post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionBtns post= {post} />
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsLists