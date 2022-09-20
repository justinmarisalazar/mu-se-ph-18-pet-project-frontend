import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import api from 'helpers/api';
import useAuth from 'hooks/useAuth';
import usePosts from 'hooks/usePost';
import React, { useState } from 'react';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { setPosts } = usePosts();
  const { auth } = useAuth();

  const handleAddPost = async () => {
    const res = await api.post('/posts', { title, content });
    setTitle('');
    setContent('');
    const newPost = {
      ...res.data,
      user: auth,
    };
    setPosts((prev) => [...prev, newPost]);
  };

  return (
    <Card>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <Typography>Add Post</Typography>
        <TextField
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          minRows={2}
          placeholder='Body'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </CardContent>
      <CardActions sx={{ padding: '0 16px 16px 16px' }}>
        <Button fullWidth variant='contained' onClick={handleAddPost}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddPost;
