import React from 'react';
import HomePage from './Pages/HomePage/HomePage'

import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import isElectron from 'is-electron';

const isOnElectron = isElectron()
console.log("Is running on Electron? " + isElectron());

function App() {
  return (
      <div className="App">
      <BrowserRouter >
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
      </div>


  );
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/

