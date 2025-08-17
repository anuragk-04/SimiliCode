import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Container,
} from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import CodeCompare from './codeCompare/codeCompare';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <Container>
        <Box mt={10} textAlign="center">
          <Typography variant="h4" color="error">
            No Result Found
          </Typography>
        </Box>
      </Container>
    );
  }

  const plagiarism = Number(result.score.toFixed(2));
  const originality = Number((100 - result.score).toFixed(2));

  return (
    <Box maxWidth="40vw" sx={{ pl: 4, pt: 5 }}>
      {/* Header */}
      <Box mt={1} textAlign="left">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          fontWeight="bold"
          color="primary"
        >
          Similarity Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's a summary of the similarity comparison between the two submissions.
        </Typography>
      </Box>

      {/* Paper */}
      <Paper elevation={5} sx={{ mt: 3, pt: 4, pl: 5, minHeight: '95vh', borderRadius: 4 }}>
        <Grid container spacing={4} direction="column" alignItems="flex-start" sx={{ pl: 10 }}>
          {/* Pie Chart */}
          <Grid item xs={12}>
            <Box sx={{ pt: 5 }}>
              <PieChart
                data={[
                  { title: 'Similar', value: plagiarism, color: '#f44336' },
                  { title: 'Original', value: originality, color: '#4caf50' },
                ]}
                animate
                label={() => ''}
                radius={50}
              />
            </Box>
          </Grid>

          {/* Score Details */}
          <Grid item xs={12} sx={{ pl: 9 }}>
            <Typography variant="h5" gutterBottom>
              Score Details
            </Typography>
            <Divider sx={{ mb: 2, width: '100%' }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Similarity:</strong>{' '}
              <Typography component="span" color="error" fontWeight={600}>
                {plagiarism}%
              </Typography>
            </Typography>
            <Typography variant="body1">
              <strong>Originality:</strong>{' '}
              <Typography component="span" color="success.main" fontWeight={600}>
                {originality}%
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Result;
