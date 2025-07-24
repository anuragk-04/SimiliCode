import React from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <NavBar />

      <Box flexGrow={1} p={2}>
        <h1>Welcome to SimiliCode!</h1>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
