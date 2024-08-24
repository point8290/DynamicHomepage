import React from "react";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Admin from "./components/Admin/Admin";
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
