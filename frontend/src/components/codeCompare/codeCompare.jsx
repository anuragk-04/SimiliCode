import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CodeCompare = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result || !result.similarities) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          No result data available.
        </Typography>
      </Box>
    );
  }

  const similarityKeys = Object.keys(result.similarities).sort(
    (a, b) => Number(a) - Number(b)
  );

  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  const currentKey = similarityKeys[currentPairIndex];
  const pairData = result.similarities[currentKey];

  const file1 = pairData.submission1.file;
  const file2 = pairData.submission2.file;
  const lines1 = pairData.submission1.lines;
  const lines2 = pairData.submission2.lines;

  const content1 = result.submission1[file1] || '';
  const content2 = result.submission2[file2] || '';

  const highlightLines = (content, linesToHighlight) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const isHighlighted = linesToHighlight.includes(idx + 1);
      return (
        <Typography
          key={idx}
          component="pre"
          sx={{
            backgroundColor: isHighlighted ? '#ffe0e0' : 'transparent',
            color: isHighlighted ? '#c62828' : '#212121',
            px: 1,
            py: 0.5,
            m: 0,
            borderRadius: 1,
            fontSize: '0.9rem',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            transition: 'background-color 0.3s ease',
          }}
        >
          <span style={{ opacity: 0.5 }}>{String(idx + 1).padStart(3, '0')} | </span>
          {line}
        </Typography>
      );
    });
  };

  return (
    <Box sx={{ p: 7 }} maxWidth="55vw" minWidth="45vw" minHeight="95vh" ml="auto">
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold" color="primary">
        Code Comparison
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          disabled={currentPairIndex === 0}
          onClick={() => setCurrentPairIndex(prev => prev - 1)}
        >
          Prev
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          disabled={currentPairIndex === similarityKeys.length - 1}
          onClick={() => setCurrentPairIndex(prev => prev + 1)}
        >
          Next
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ overflowX: 'auto', minHeight: '60vh' }}>
        {/* Submission 1 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 4, minHeight: 300, maxWidth: 300 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Submission 1 ({file1})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{
              maxHeight: '70vh',
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
              p: 1,
              borderRadius: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {highlightLines(content1, lines1)}
            </Box>
          </Paper>
        </Grid>

        {/* Submission 2 */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 4, minHeight: 300, maxWidth: 300 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Submission 2 ({file2})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{
              maxHeight: '70vh',
              overflowY: 'auto',
              backgroundColor: '#f5f5f5',
              p: 1,
              borderRadius: 2,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {highlightLines(content2, lines2)}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CodeCompare;
