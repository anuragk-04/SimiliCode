import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const contributors = [
  { name: 'Anurag', url: 'https://www.linkedin.com/in/anuragk04/' }
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#bbdefb', py: 4, mt: 4, borderTop: '1px solid #ccc' }}>
      <Container maxWidth="lg">
        <Grid container justifyContent={'space-between'}>
          {/* Contributors Section */}
          <Grid item xs={12} md={6} textAlign={'left'}>
            <Typography variant="h6" gutterBottom>
              <u><b>Developer</b></u>
            </Typography>
            <Grid container spacing={1} direction={'column'}>
              {contributors.map((person) => (
                <Grid item xs={12} sm={6} key={person.name}>
                  <Link
                    href={person.url}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                    display="flex"
                    alignItems="center"
                    sx={{ fontSize: '1.5rem' }}
                  >
                    {person.name} <LinkedInIcon sx={{ fontSize: 30, ml: 1 }} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* University Section */}
          <Grid item xs={12} md={6} textAlign={'right'}>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Link
                href="https://www.mnnit.ac.in/"
                target="_blank"
                rel="noreferrer"
                underline="hover"
                sx={{ fontSize: '1.1rem' }}
              >
                Motilal Nehru National Institute Of Technology Allahabad
              </Link>
            </Box>
            <Typography variant="body1">
              <Link
                href="https://www.mnnit.ac.in/"
                target="_blank"
                rel="noreferrer"
                underline="hover"
                sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                Prayagraj, Uttar Pradesh
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
