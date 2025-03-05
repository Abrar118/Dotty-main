import React from "react";
import "./App.css";
import CurrentScore from "./CurrentScore";
import Scorelist from "./Scorelist";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<CurrentScore />} />
        <Route path="/currentscore" element={<CurrentScore />} />
        <Route path="/scorelist" element={<Scorelist />} />
      </Routes>
    </Router>
  );
}

export default App;
