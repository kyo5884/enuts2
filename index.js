const electron = require('electron');
const {app, BrowserWindow} = electron;
const Store = require('electron-store');
const store = new Store();

const ROOT_PATH = 'file://' + __dirname;


app.on('ready', () => {

    if (store.get('token') == null) {
        const authWindow = new BrowserWindow({
            width: 400,
            height: 700,
            minimizable: false,
            maximizable: false,
            title: 'Authentication'
        });
        authWindow.loadURL('https://pnut.io/oauth/authenticate?client_id=u2FIOMI4zYh_quby0QvzA94MvirO9VNg&redirect_uri=http://kyo5884.tk/enuts/auth_done&scope=basic,files,follow,messages,polls,presence,stream,update_profile,write_post&response_type=token');

        const ses = authWindow.webContents.session;
        ses.webRequest.onBeforeRedirect((listener) => {
            const newURL = listener.redirectURL;
            if (newURL.match("http://kyo5884.tk/enuts/auth_done#access_token=")) {
                token = newURL.match(/#access_token=(.+)/)[1];
                store.set('token', token);
                authWindow.close();
                showMainWindow();
            }
        });
    } else {
        showMainWindow();
    }
});

function showMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 600,
        titleBarStyle: 'hiddenInset',
        minWidth: 250,
        vibrancy: 'ultra-dark',
        transparent: true,
        webPreferences: { experimentalFeatures: true }
    });
    mainWindow.loadURL(ROOT_PATH + '/index.html');
}

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});