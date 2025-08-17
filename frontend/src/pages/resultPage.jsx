import React from 'react'
import PlagResult from '../components/plagResult'
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import CodeCompare from '../components/codeCompare/codeCompare';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const ResultPage = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Box display={'flex'} flexDirection={'column'}>
        <Box position={'fixed'} sx={{p: 1}} zIndex={1000}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" sx={{ pt: 6, gap: 4 }}>
        <PlagResult />
        <CodeCompare />
      </Box>
      </Box>
    </div>
  )
}

export default ResultPage
