import {
  Box,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { Comment, VoteButton } from 'components';
import useAuth from 'hooks/useAuth';

const PostCard = ({ post }) => {
  const { title, user, content, upvotes, downvotes, comments } = post;
  const [isCommentShown, setIsCommentShown] = useState(false);
  const { auth } = useAuth();

  return (
    <Card>
      <CardContent sx={{ paddingBottom: '16px !important' }}>
        <Typography fontWeight={500}>{title}</Typography>
        <Typography fontSize='10px'>@{user.username}</Typography>
        <Typography fontSize='13px' paddingTop={1}>
          {content}
        </Typography>
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          gap='4px'
          pb={1}
        >
          <VoteButton type='upvote' postId={post.id} />
          {upvotes.length - downvotes.length}
          <VoteButton type='downvote' postId={post.id} />
        </Box>
        <Divider />
        <Box pt={2}>
          <Typography
            fontSize='12px'
            textAlign='center'
            color='primary'
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsCommentShown(!isCommentShown)}
          >
            {isCommentShown ? 'Hide Comments' : 'Show Comments'}
          </Typography>
          {isCommentShown && (
            <Box display='flex' flexDirection='column' pt={2} gap={1}>
              {comments.map((comment) => (
                <Comment comment={comment} />
              ))}
              {comments.length <= 0 && (
                <Typography fontSize='12px'>No comments to show.</Typography>
              )}
              {auth && (
                <TextField variant='outlined' placeholder='Add Comment' />
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
