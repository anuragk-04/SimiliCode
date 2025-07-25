import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CodeCompare = () => {
  const location = useLocation();
  const data = location.state?.result;

  const plagiarismKeys = Object.keys(data || {})
    .filter((key) => !isNaN(Number(key)))
    .sort((a, b) => Number(a) - Number(b));

  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  if (!data || plagiarismKeys.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          No result data available.
        </Typography>
      </Box>
    );
  }

  const currentKey = plagiarismKeys[currentPairIndex];
  const pairData = data[currentKey];

  const file1 = pairData.submission1.file;
  const file2 = pairData.submission2.file;
  const lines1 = pairData.submission1.lines;
  const lines2 = pairData.submission2.lines;

  const content1 = data.submission1[file1] || '';
  const content2 = data.submission2[file2] || '';

  const renderTextareaLikeBlock = (content, linesToHighlight) => {
    const lines = content.split('\n');
    return (
      <Box
        component="pre"
        sx={{
          bgcolor: '#f8f8f8',
          border: '1px solid #ccc',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          borderRadius: 1,
          p: 1,
          whiteSpace: 'pre-wrap',
          overflow: 'auto',
          height: '70vh',
          lineHeight: 1.5,
        }}
      >
        {lines.map((line, index) => {
          const isHighlighted = linesToHighlight.includes(index + 1);
          return (
            <Box
              key={index}
              component="div"
              sx={{
                backgroundColor: isHighlighted ? '#ffe0e0' : 'transparent',
                color: isHighlighted ? '#c62828' : 'inherit',
                px: 1,
                borderRadius: 1,
              }}
            >
              <span style={{ opacity: 0.5 }}>
                {String(index + 1).padStart(3, '0')} |{' '}
              </span>
              {line}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Code Plagiarism Report
      </Typography>

      <Box display="flex" justifyContent="center" my={2}>
        <Chip label={`Similarity Score: ${data.score}%`} color="primary" />
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          disabled={currentPairIndex === 0}
          onClick={() => setCurrentPairIndex((prev) => prev - 1)}
        >
          Previous Pair
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          disabled={currentPairIndex === plagiarismKeys.length - 1}
          onClick={() => setCurrentPairIndex((prev) => prev + 1)}
        >
          Next Pair
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Submission 1 ({file1})
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {renderTextareaLikeBlock(content1, lines1)}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Submission 2 ({file2})
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {renderTextareaLikeBlock(content2, lines2)}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeCompare;
