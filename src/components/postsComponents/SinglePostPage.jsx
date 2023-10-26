import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { selectPostById } from "../../features/posts/postsSlice"

import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionBtns from "./ReactionBtns"

const SinglePostPage = () => {

    const {postId} = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if(!post){
        return(
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

  return (
    <article >
        <h3>{post.title}</h3>
        <p>{ post.body}</p>
        <p className="postCredit">
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <Link to={`/user/${post.userId}`}>
              <PostAuthor userId = {post.userId} />
            </Link>
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionBtns post= {post} />
    </article>
  )
}

export default SinglePostPage