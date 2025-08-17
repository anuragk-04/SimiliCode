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
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const Upload = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null); // Store full response

  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3000/api/plagiarism', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Handle backend response
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const result = response.data[0];
        if (result.score !== undefined) {
          setScore(result.score);
          setResultData(result);
        } else {
          setError('No score found in server response.');
        }
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

  const handleViewResult = () => {
    if (resultData) {
      navigate("/result", { state: { result: resultData } });
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
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 5, minHeight: 300, minWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>Upload File 1</Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select ZIP File
              <input type="file" accept=".zip" hidden onChange={(e) => handleFileChange(e, setFile1)} />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {file1 ? file1.name : 'No file selected'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 5, minHeight: 300, minWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Typography variant="h5" gutterBottom>Upload File 2</Typography>
            <Button variant="contained" size="large" component="label" sx={{ mt: 3, px: 4, py: 1.5 }}>
              Select ZIP File
              <input type="file" accept=".zip" hidden onChange={(e) => handleFileChange(e, setFile2)} />
            </Button>
            <Typography variant="body1" sx={{ mt: 3 }}>
              {file2 ? file2.name : 'No file selected'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={5} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          disabled={!file1 || !file2 || isLoading}
          onClick={handlePlagiarismCheck}
          size="large"
          sx={{ px: 5, py: 2, borderRadius: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Check Plagiarism'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

      {score !== null && (
        <Box mt={5} textAlign="center">
          <Button
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
            onClick={handleViewResult}
            size="large"
            sx={{ px: 5, py: 2, minWidth: 235, borderRadius: 2 }}
          >
            View Result
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Upload;
