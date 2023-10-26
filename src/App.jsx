import { Routes,Route, Navigate } from 'react-router-dom';
import AddPostForm from './components/postsComponents/AddPostForm';
import PostsLists from './components/postsComponents/PostsLists';
import Layout from './components/Layout';
import SinglePostPage from './components/postsComponents/SinglePostPage';
import EditPostForm from './components/postsComponents/EditPostForm';
import UsersList from './components/usersComponents/UsersList';
import UsersPage from './components/usersComponents/UsersPage';

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

        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<UsersPage />} />
          {/* <Route path='edit/:userId' element={< />} /> */}
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        {/* <Route path='*' element={<Navigate to='/' replace />} /> */}

      </Route>
    </Routes>
  )
}

export default App