import React, { useState } from "react";
import PurchasesPage from "./Pages/PurchasesPage/PurchasesPage";
import AppsCatalogPage from "./Pages/AppsPage/AppsCatalogPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import isElectron from "is-electron";
import { ElectronMessages } from "./ElectronCommunication/ElectronMessages";
import ReactDOM from "react-dom";
import NavigationBar from "./Pages/Shared/NavigationBar";
import Footer from "./Pages/Shared/Footer";
import SideNav from "./Pages/Shared/SideNav";
import { IS_ON_ELECTRON } from "./ElectronCommunication/SharedElectronConstants";
import UploadPage from "./Pages/UploadPage/UploadPage";
import { PagePaths } from "./ReactConstants";
import AppData from "./Pages/AppsPage/AppData";
import DUMMY_APPS from "./Pages/AppsPage/DummyApps";
import AppDetailsModal from "./Pages/AppsPage/Components/AppDetailsModal";

console.log("Is running on Electron? " + isElectron());

const handleDemoClick = () => {
  if (IS_ON_ELECTRON) {
    const { ipcRenderer } = window.require("electron");
    const res = ipcRenderer.sendSync("alert", JSON.stringify({}));
    console.log(res);
  }
  console.log("button clicked");
};

const handleDemoClickAsync = () => {
  if (IS_ON_ELECTRON) {
    const { ipcRenderer } = window.require("electron");

    ipcRenderer
      .invoke(ElectronMessages.ECHO_MSG, JSON.stringify({ payload: "HI" }))
      .then((result: any) => {
        console.log("invoke reply:" + result);
      });
  }
  console.log("button clicked");
};

function App() {
  const [displayedApps, setDisplayedApps] = useState<Array<AppData>>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="App">
      <BrowserRouter>
        <SideNav />
        <NavigationBar
          setNumberOfPages={setNumberOfPages}
          setDisplayedApps={setDisplayedApps}
        />
        <Routes>
          <Route
            path={PagePaths.AppsPagePath}
            element={
              <AppsCatalogPage
                displayedApps={displayedApps}
                numberOfPages={numberOfPages}
                setNumberOfPages={setNumberOfPages}
                setDisplayedApps={setDisplayedApps}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path={PagePaths.PurchasesPagePath}
            element={<PurchasesPage />}
          />
          <Route path={PagePaths.UploadPagePath} element={<UploadPage />} />
          <Route path={PagePaths.NotFoundPagePath} element={<ErrorPage />} />
        </Routes>
        {/*Prevents footer to hide content */}
        <div
          className="clear"
          style={{ clear: "both", height: "60px" }}
        ></div>{" "}
        <Footer />
      </BrowserRouter>
    </div>
    /*
<Route path={"/debug"} element={<AppDetailsModal />} />
 */

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
