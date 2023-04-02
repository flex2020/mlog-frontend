import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './pages/Post/PostList';
import './assets/common.css'
import PostWrite from './pages/Post/PostWrite.jsx';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/post' element={<PostList />} />
          <Route path='/post/write' element={<PostWrite />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;