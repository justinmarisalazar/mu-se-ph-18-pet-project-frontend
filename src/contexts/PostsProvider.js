import { createContext, useState, useEffect } from 'react';

import api from 'helpers/api';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await api.get('/posts');
      setPosts(res.data);
    };

    getPosts();
  }, [setPosts]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
