import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './App.css'
import PostList from './pages/Post/PostList';
import PostDetail from './pages/Post/PostDetail';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<PostList />} />
          <Route path='/post/:id' element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;