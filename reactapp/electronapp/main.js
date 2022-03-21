

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
require('@electron/remote/main').initialize()
const {REACT_ADDRESS} = require("../src/GeneralConstants");

const fs = require('fs')
const path = require('path')
const url = require("url");

function createWindow () {
    // Create the browser window.
    console.log("Creating Electron Window")

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false
        }
    })
    // and load the index.html of the app.
    console.log(`React Address: ${REACT_ADDRESS}`)
    mainWindow.loadURL(REACT_ADDRESS)

    // Open the DevTools.

     mainWindow.webContents.openDevTools()
}

const { ipcMain } = require("electron");
const { dialog } = require("electron");

ipcMain.on("alert", (event, data) => {
// here we can process the data
// we can send reply to react using below code
    console.log("electron: ipc alert")
    dialog.showErrorBox("error title", "cool error")
    //event.reply(“send-data-event-name-reply”, ‘Hey react app processed your event’);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})