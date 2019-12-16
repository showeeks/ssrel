import {app, BrowserWindow, ipcMain} from 'electron';
import {fetchAll, updateAll} from "./Config";
import SSRConfig from "./SSRConfig";
import {rejects} from "assert";

const socks5_https_client = require("socks5-https-client")
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1200, height: 600, webPreferences: {nodeIntegration: true}});

    // and load the index.html of the app.
    let startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('sub', (event, _) => {
    (async (): Promise<SSRConfig[]> => {
        console.log("subscribe1");
        await updateAll();
        const resp = await new Promise((resolve, reject) => {
            socks5_https_client.get({
                hostname: 'www.google.com',
                path: '/',
                socksHost: '10.1.11.10', // Defaults to 'localhost'.
                socksPort: 1086, // Defaults to 1080.
            }, (res) => {
                res.setEncoding("utf8");
                res.on('readable', () => {
                    resolve(res.read())
                })
            })
        });
        console.log(resp);
        return await fetchAll();
    })().then((configs: SSRConfig[]) => {
        console.log("sub3")
        event.returnValue = configs
        // event.returnValue = configs
    });
    // // event.returnValue = "hello"
    // // console.log("hello")
    // let ar = new Array<SSRConfig>();
    // ar.push(new SSRConfig())
    // // event.reply("pub", "hello sub")
    // event.returnValue = ar
    // // console.log("subscribe2")
});