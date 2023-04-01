import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import './assets/common.css'
import PostWrite from './pages/Post/PostWrite.jsx';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/write' element={<PostWrite />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;