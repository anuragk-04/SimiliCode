import React from 'react';
import { Typography, Box } from '@mui/material';
import CodePage from './codePage';

const CodeArea = ({ index, plagiarism_data }) => {
  const filePair = plagiarism_data[`Pair_${index}`];

  if (!filePair) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        No data available for Pair {index}
      </Typography>
    );
  }

  const { file1, file2, file1_plag_lines, file2_plag_lines } = filePair;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',             // ✅ Prevent vertical wrapping
        overflowX: 'auto',              // ✅ Enable horizontal scroll if needed
        gap: 2,
        p: 2,
        height: '100%',                 // Optional: fill height
      }}
    >
      {/* Fixed-width Code Blocks */}
      <Box sx={{ minWidth: '600px', flexShrink: 0 }}>
        <CodePage
          title={file1?.filename || 'File A'}
          code={file1?.code || ''}
          plagiarizedLines={file1_plag_lines || []}
        />
      </Box>

      <Box sx={{ minWidth: '600px', flexShrink: 0 }}>
        <CodePage
          title={file2?.filename || 'File B'}
          code={file2?.code || ''}
          plagiarizedLines={file2_plag_lines || []}
        />
      </Box>
    </Box>
  );
};

export default CodeArea;
