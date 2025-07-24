import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Container,
  Alert,
} from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const Upload = () => {
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e, setFiles) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handlePlagiarismCheck = async () => {
    if (!files1.length || !files2.length) return;

    setIsLoading(true);
    setError('');
    setScore(null);

    const formData = new FormData();
    files1.forEach((file) => formData.append('folder1', file));
    files2.forEach((file) => formData.append('folder2', file));

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && typeof response.data.score === 'number') {
        setScore(response.data.score);
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const canRunCheck = files1.length > 0 && files2.length > 0;

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Upload Files (.zip)
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="space-around">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              p: 5,
              minHeight: 300,
              minWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Folder 1
            </Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select Folder
              <input
                type="file"
                webkitdirectory="true"
                mozdirectory="true"
                directory="true"
                multiple
                hidden
                onChange={(e) => handleFileUpload(e, setFiles1)}
              />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {files1.length} files selected
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              p: 5,
              minHeight: 300,
              minWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Upload Folder 2
            </Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select Folder
              <input
                type="file"
                webkitdirectory="true"
                mozdirectory="true"
                directory="true"
                multiple
                hidden
                onChange={(e) => handleFileUpload(e, setFiles2)}
              />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {files2.length} files selected
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          disabled={!canRunCheck || isLoading}
          onClick={handlePlagiarismCheck}
          size="large"
          sx={{ px: 5, py: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Check Plagiarism'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {score !== null && (
        <Box mt={5} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Plagiarism Score: {score}%
          </Typography>
          <PieChart
            data={[
              { title: 'Plagiarised', value: score, color: '#C13C37' },
              { title: 'Unique', value: 100 - score, color: '#02A938' },
            ]}
            style={{ height: '200px' }}
            lineWidth={40}
            animate
          />
        </Box>
      )}
    </Container>
  );
};

export default Upload;
