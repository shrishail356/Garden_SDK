import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Game from "./Game";
import Swap from "./Swap";

const App: React.FC = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/deposit" element={<Swap />} />
          </Routes>
        </Router>
        <ToastContainer />
    </>
  )
};

export default App;
