import { Routes,Route } from 'react-router-dom';
import AddPostForm from './components/postsComponents/AddPostForm';
import PostsLists from './components/postsComponents/PostsLists';
import Layout from './components/Layout';
import SinglePostPage from './components/postsComponents/SinglePostPage';
import EditPostForm from './components/postsComponents/EditPostForm';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<PostsLists />} />

        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App