import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionBtns from "./ReactionBtns"
import { Link } from "react-router-dom"

const PostsExcerpt = ({post}) => {
  return (
    <article >
        <h2>{post.title}</h2>
        <p className="excerpt">{post.body.substring(0,75)}...</p>
        <p className="postCredit">
            <Link to={`post/${post.id}`} >View Post</Link>
            <Link to={`user/${post.userId}`}>
              <PostAuthor userId = {post.userId} />
            </Link>
            <TimeAgo timestamp={post.date} />
        </p>
        <ReactionBtns post= {post} />
    </article>
  )
}

// memoising the postExcerpt to avoid unnecessary re render of each post on change of reaction of only one post.
// PostsExcerpt = React.memo(PostsExcerpt)

export default PostsExcerpt