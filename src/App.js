import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './App.css'
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';
import ProjectList from './pages/Project/ProjectList';
import ProjectDetail from './pages/Project/ProjectDetail';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<PostList />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/project' element={<ProjectList />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;