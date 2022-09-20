import { Box } from '@mui/material';

import { AddPost, PostCard } from 'components';

import useAuth from 'hooks/useAuth';
import usePost from 'hooks/usePost';

const PostsList = () => {
  const { posts } = usePost();
  const { auth } = useAuth();

  return (
    <Box
      display='flex'
      flexDirection='column-reverse'
      margin='16px auto 16px auto'
      gap='16px'
      maxWidth='600px'
    >
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
      {auth && <AddPost />}
    </Box>
  );
};

export default PostsList;
