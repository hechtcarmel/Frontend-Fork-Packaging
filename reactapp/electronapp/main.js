

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
require('@electron/remote/main').initialize()


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
    mainWindow.loadURL('http://localhost:3000')

    // Open the DevTools.
     mainWindow.webContents.openDevTools()
}

const { ipcMain } = require("electron");
const { dialog } = require("electron");

ipcMain.on("alert", (event, data) => {
// here we can process the data
// we can send reply to react using below code
    console.log("AAAAAAAAAA")
    dialog.showErrorBox("error title", "cool error")
    //event.reply(“send-data-event-name-reply”, ‘Hey react app processed your event’);
});
/*
const {ipcMain, app} = require('electron')
ipcMain.on('alert', (event, data) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
})
*/

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.





/*
let mainWindow
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({})

    console.log(path.join(__dirname,'test.html'))

    //load html into window


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'test.html'),
        protocol:'file',
        slashes: true
    }))
})*/