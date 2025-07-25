import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "What is SimiliCode?",
      points: [
        "SimiliCode is a plagiarism detection application built using TypeScript, JavaScript, ReactJS and NodeJS.",
        "It detects similarity between JavaScript codebases.",
        "Supports single/multiple files across nested folders.",
        "Detects renamed variables, moved code, changed comments, and more.",
        "Highlights code similarities visually on a compare page.",
      ],
    },
    {
      title: "How to use SimiliCode?",
      points: [
        "Upload two zip files containing JavaScript files (non-JS files are ignored).",
        "Click 'Check Plagiarism' to start detection.",
        " Click 'View Result' as a similarity percentage.",
        "Use 'Next' and 'Prev' to navigate matched files.",
      ],
    },
    {
      title: "How does it work?",
      points: [
        "Uses Abstract Syntax Trees (AST) for plagiarism detection.",
        "Transforms each JavaScript file into an AST.",
        "Compares AST nodes from two submissions.",
        "Displays a similarity score indicating percentage match.",
        "Compare page visually shows matched code with red highlights.",
      ],
    }
    
  ];

  return (
    <>
      <Box position="fixed" top={12} left={16} zIndex={1000}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Box>

      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        {sections.map((section, index) => (
          <Box key={index} mb={4}>
            <Card variant="outlined">
              <CardHeader
                title={section.title}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                <List>
                  {section.points.map((point, idx) => (
                    <ListItem key={idx} alignItems="flex-start">
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default AboutPage;
