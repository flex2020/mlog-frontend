import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './App.css'
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import ProjectList from './pages/Project/ProjectList';
import ProjectDetail from './pages/Project/ProjectDetail';
import Login from './pages/Admin/Login';
import Management from './pages/Admin/Management';
import AuthCheck from './hoc/AuthCheck';
import PostUpload from './pages/Post/PostUpload';
import PostModify from './pages/Post/PostModify';
import ProjectUpload from './pages/Project/ProjectUpload';

function App() {
  const AuthManagement = AuthCheck(Management);
  const AuthPostUpload = AuthCheck(PostUpload);
  const AuthPostModify = AuthCheck(PostModify);
  const AuthProjectUpload = AuthCheck(ProjectUpload);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<PostList />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/project' element={<ProjectList />} />
        <Route path='/project/:id' element={<ProjectDetail />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/management' element={<AuthManagement />} />
        <Route path='/admin/upload/post' element={<AuthPostUpload />} />
        <Route path='/admin/modify/post/:id' element={<AuthPostModify />} />
        <Route path='/admin/upload/project' element={<AuthProjectUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;