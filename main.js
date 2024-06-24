const { app, BrowserWindow } = require('electron')
const path = require('path')
const os = require('os');

const electronIsDev = require('electron-is-dev');
//var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;
const windowStateKeeper = require('electron-window-state');



function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    fullscreen: false,
    //icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.php');
  //win.loadURL(`file://${__dirname}/dist/index.html`);
  //mainWindow.loadURL(electronIsDev ? "http://localhost:3500" : `file://${path.join(__dirname, "../build/index.html")}`);
  //mainWindow.loadURL('http://192.168.1.157:3500')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});



function getLocalIPAddresses() {
  const networkInterfaces = os.networkInterfaces();
  const addresses = [];

  // Loop through network interfaces to find IP addresses
  for (const key in networkInterfaces) {
    if (networkInterfaces.hasOwnProperty(key)) {
      const interfaces = networkInterfaces[key];
      for (const interfaceInfo of interfaces) {
        if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
          addresses.push(interfaceInfo.address);
        }
      }
    }
  }

  return addresses;
}

app.on('ready', () => {
  const localIPAddresses = getLocalIPAddresses();
  console.log('Local IP Addresses:', localIPAddresses);
});
