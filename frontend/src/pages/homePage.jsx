import React from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { Box } from '@mui/material';
import Upload from '../components/upload';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <NavBar />

      <Box flexGrow={1} p={2}>
        <Upload />
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
