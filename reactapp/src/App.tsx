import React from 'react';
import Home from './Pages/Home/Home'

import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <div className="App">
      <BrowserRouter >

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="add" element={<AddUser />} />
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

