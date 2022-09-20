import { Alert, IconButton, Snackbar, useTheme } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import useAuth from 'hooks/useAuth';
import usePosts from 'hooks/usePost';
import { useEffect, useState } from 'react';
import api from 'helpers/api';

const VoteButton = ({ type, postId }) => {
  const { auth } = useAuth();
  const { posts, setPosts } = usePosts();
  const [iconColor, setIconColor] = useState('rgba(0, 0, 0, 0.87)');
  const [isSnackbarShown, setIsSnackbarShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const theme = useTheme();

  const handleVote = async () => {
    if (!auth) {
      setAlertMessage('You are not logged in');
      setAlertSeverity('error');
      return setIsSnackbarShown(true);
    }

    if (type === 'upvote') {
      await api.get(`/posts/${postId}/toggleUpvote`);
      setPosts((posts) => {
        const newPosts = posts.map((post) => {
          if (post.id === postId) {
            if (post.upvotes.includes(auth.id)) {
              post.upvotes = post.upvotes.filter(
                (userId) => userId !== auth.id
              );
            } else {
              post.upvotes = [...post.upvotes, auth.id];
              if (post.downvotes.includes(auth.id)) {
                post.downvotes = post.downvotes.filter(
                  (userId) => userId !== auth.id
                );
              }
            }
          }

          return post;
        });

        return newPosts;
      });
    } else if (type === 'downvote') {
      await api.get(`/posts/${postId}/toggleDownvote`);
      setPosts((posts) => {
        const newPosts = posts.map((post) => {
          if (post.id === postId) {
            if (post.downvotes.includes(auth.id)) {
              post.downvotes = post.downvotes.filter(
                (userId) => userId !== auth.id
              );
            } else {
              post.downvotes = [...post.downvotes, auth.id];
              if (post.upvotes.includes(auth.id)) {
                post.upvotes = post.upvotes.filter(
                  (userId) => userId !== auth.id
                );
              }
            }
          }

          return post;
        });

        return newPosts;
      });
    }
  };

  useEffect(() => {
    const post = posts.find((post) => post.id === postId);

    if (type === 'upvote') {
      if (post?.upvotes.includes(auth?.id)) {
        setIconColor(theme.palette.primary.main);
      } else {
        setIconColor('rgba(0, 0, 0, 0.87)');
      }
    } else if (type === 'downvote') {
      if (post?.downvotes.includes(auth?.id)) {
        setIconColor(theme.palette.secondary.main);
      } else {
        setIconColor('rgba(0, 0, 0, 0.87)');
      }
    }
  }, [
    auth?.id,
    postId,
    posts,
    theme.palette.primary.main,
    theme.palette.secondary.main,
    type,
  ]);

  return (
    <>
      <IconButton size='small' onClick={handleVote}>
        {type === 'upvote' && (
          <NorthIcon fontSize='16px' sx={{ color: iconColor }} />
        )}
        {type === 'downvote' && (
          <SouthIcon fontSize='16px' sx={{ color: iconColor }} />
        )}
      </IconButton>
      <Snackbar
        open={isSnackbarShown}
        onClose={() => setIsSnackbarShown(false)}
      >
        <Alert severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default VoteButton;
