import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostList from './pages/Post/PostList';
import './assets/common.css'
import PostWrite from './pages/Post/PostWrite.jsx';
import PostView from './pages/Post/PostView';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/post' element={<PostList />} />
          <Route path='/post/write' element={<PostWrite />} />
          <Route path='/post/:id' element={<PostView />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;