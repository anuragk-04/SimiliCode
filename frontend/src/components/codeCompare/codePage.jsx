import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CodeLine from './codeLine';

const CodePage = ({ title, code, plagiarizedLines = [] }) => {
  const codeLines = code.split('\n');

  return (
    <Box sx={{ my: 3 }} >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Paper
        elevation={2}
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          p: 1,
        }}
      >
        {codeLines.map((line, index) => (
          <CodeLine
            key={index}
            line={line}
            lineNo={index + 1}
            isPlagiarized={plagiarizedLines.includes(index + 1)}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default CodePage;
