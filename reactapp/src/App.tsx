import React from 'react';
import PurchasesPage from './Pages/PurchasesPage/PurchasesPage'
import AppsCatalogPage from './Pages/AppsPage/AppsCatalogPage'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import isElectron from 'is-electron';
import {ElectronMessages} from "./ElectronCommunication/ElectronMessages";
import ReactDOM from "react-dom";
import NavigationBar from "./Pages/Shared/NavigationBar";
import Footer from "./Pages/Shared/Footer";
import SideNav from "./Pages/Shared/SideNav";
//import {webContents} from "@electron/remote";
import {IS_ON_ELECTRON} from './GeneralConstants'
import UploadPage from "./Pages/UploadPage/UploadPage";
console.log("Is running on Electron? " + isElectron());

const handleDemoClick = () => {
    if(IS_ON_ELECTRON){
        const { ipcRenderer } = window.require("electron")
        const res = ipcRenderer.sendSync("alert", JSON.stringify({}));
        console.log(res)
    }
    console.log("button clicked")
}

const handleDemoClickAsync = () => {
    if(IS_ON_ELECTRON){

        const { ipcRenderer } = window.require("electron")

        ipcRenderer.invoke(ElectronMessages.ECHO_MSG, JSON.stringify({payload: 'HI'})).then((result: any) => {
            console.log('invoke reply:' + result)
        })
    }
    console.log("button clicked")
}
//<NavigationBar />
function App() {

    return (
        <div className="App">
            <BrowserRouter >
                <SideNav />
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<AppsCatalogPage />} />
                    <Route path="/purchases" element={<PurchasesPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />

            </BrowserRouter>
        </div>


    /*
    if(isOnElectron){
        return (
            <div>
                <h1>Hello! Welcome to the homepage!</h1>
                 <h1> You are running on Electron! </h1>
                <button onClick={handleDemoClick}> Show Error Box Synchronous</button>
                <button onClick={handleDemoClickAsync}> Show Error Box Async</button>

            </div>
        )
    }

  return (
      <div className="App">
      <BrowserRouter >
          <Routes>
              <Route path="/" element={<PurchasesPage />} />
              <Route path="*" element={<ErrorPage />} />
          </Routes>
      </BrowserRouter>
      </div>
  */
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

