import { Box, Typography } from '@mui/material';
import React from 'react';

const Comment = ({ comment }) => {
  const { user, content } = comment;

  return (
    <Box>
      <Typography fontSize='10px'>@{user.username}</Typography>
      <Typography fontSize='13px'>{content}</Typography>
    </Box>
  );
};

export default Comment;
