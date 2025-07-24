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
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e, setFile) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handlePlagiarismCheck = async () => {
    if (!file1 || !file2) {
      setError('Please upload both zip files.');
      return;
    }

    setIsLoading(true);
    setError('');
    setScore(null);

    const formData = new FormData();
    formData.append('submission1', file1);
    formData.append('submission2', file2);

    try {
      const response = await axios.post('http://localhost:8000/api/plagiarism', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && Array.isArray(response.data) && response.data[0]?.score !== undefined) {
        setScore(response.data[0].score);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container sx={{ py: 12 }}>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Upload ZIP Files
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="space-around">
        {/* Folder 1 Upload */}
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
              Upload ZIP 1
            </Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select ZIP File
              <input
                type="file"
                accept=".zip"
                hidden
                onChange={(e) => handleFileChange(e, setFile1)}
              />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {file1 ? file1.name : 'No file selected'}
            </Typography>
          </Paper>
        </Grid>

        {/* Folder 2 Upload */}
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
              Upload ZIP 2
            </Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select ZIP File
              <input
                type="file"
                accept=".zip"
                hidden
                onChange={(e) => handleFileChange(e, setFile2)}
              />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {file2 ? file2.name : 'No file selected'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box mt={5} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          disabled={!file1 || !file2 || isLoading}
          onClick={handlePlagiarismCheck}
          size="large"
          sx={{ px: 5, py: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Check Plagiarism'}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* Pie Chart */}
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
