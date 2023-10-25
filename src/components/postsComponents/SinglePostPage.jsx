import { useSelector } from "react-redux"
import { selectPostById } from "../../features/posts/postsSlice"

import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionBtns from "./ReactionBtns"

const SinglePostPage = () => {

    //TODO: retrieve postId

    const post = useSelector((state) => selectPostById(state, postId))

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
            <PostAuthor userId = {post.userId} />
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionBtns post= {post} />
    </article>
  )
}

export default SinglePostPage