import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AboutPage from "./pages/aboutPage";
import ResultPage from "./pages/resultPage";
import './main.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
  );
}

export default App;
