import React from 'react';
import HomePage from './Pages/HomePage/HomePage'

import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import isElectron from 'is-electron';
//import {webContents} from "@electron/remote";

const isOnElectron = isElectron()

console.log("Is running on Electron? " + isElectron());

const handleDemoClick = () => {
    if(isOnElectron){
        //const electron = require("electron")
        //const ipc = electron.ipcRenderer
        //ipc.send('open-alert-dialog')

        //const electron = window.require('electron');
        //const remote = electron.remote
        //const {BrowserWindow,dialog,Menu} = remote

    }

    console.log("button clicked")


}

function App() {
    if(isOnElectron){
        return (
            <div>
                <h1>Hello! Welcome to the homepage!</h1>
                 <h1> You are running on Electron! </h1>
                <button onClick={handleDemoClick}> Alert! </button>
                <button onClick={()=>{
                    const { ipcRenderer } = window.require("electron")
                    ipcRenderer.send("alert", JSON.stringify({}));

                    //const electron = window.require('electron');
                    //require("@electron/remote/main").enable(webContents)
                    //console.log("electron:")
                    //console.log(electron)
                    //const {app} = window.require('@electron/remote')
                    //console.log("app: ")
                        //const { ipcRenderer } = require('electron')
//to minimize
                        //ipcRenderer.send('alert', {});//data contains any extra info you may need to send
                    //.log(app)

                    //console.log(app.getAppPath())
                    //const remote = app.remote
                    //console.log(remote)
                    //const {BrowserWindow,dialog,Menu} = remote
                    //console.log(BrowserWindow)
                    //let win = new BrowserWindow()
                    //dialog.showErrorBox('Error Box','Fatal Error')
                }}>
                    Show Error Box
                </button>
            </div>
        )
    }

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

