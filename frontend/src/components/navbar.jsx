import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left - Logo and Title */}
        <Box
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="h5" component="div">
            SimiliCode
          </Typography>
        </Box>

        {/* Right - About */}
        <Button
          component={Link}
          to="/about"
          startIcon={<BookIcon />}
          sx={{ color: 'inherit', textTransform: 'none' }}
        >
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
