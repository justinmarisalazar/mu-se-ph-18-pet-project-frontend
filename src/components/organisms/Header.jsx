import React, { useState } from 'react';
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import api from 'helpers/api';

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const [username, setUsername] = useState('');

  const handleSignIn = async () => {
    const res = await api.post('/users/login', { username });
    setAuth(res.data);
    setUsername('');
    setIsDialogOpen(false);
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6'>Anonymous Forum</Typography>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => (auth ? setAuth(null) : setIsDialogOpen(true))}
        >
          {auth ? 'Log Out' : 'Sign In'}
        </Button>
      </Toolbar>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Join the Anonymous Forum!</DialogTitle>
        <DialogContent>
          <TextField
            placeholder='Username'
            sx={{ width: '100%' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignIn}>Sign In</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
