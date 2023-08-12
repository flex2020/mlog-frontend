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

function App() {
  const AuthManagement = AuthCheck(Management);
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;