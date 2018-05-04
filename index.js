const electron = require('electron');
const {app, BrowserWindow} = electron;

const ROOT_PATH = 'file://' + __dirname;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 600,
        titleBarStyle: 'hiddenInset',
        minWidth: 250,
        vibrancy: 'ultra-dark',
        transparent: true
    });
    mainWindow.loadURL(ROOT_PATH + '/index.html');
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});