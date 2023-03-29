import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/post')
        .then(response => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
          {posts.map((post) => {
            return (
              <div>
                <div>{post.title}</div>
                <div>{post.content}</div>
                <div>{post.category}</div>
                <div>{post.postedDate}</div>
                <div>{post.replyCount}</div>
              </div>
            )
          })}
        </div>
    );
}

export default App;