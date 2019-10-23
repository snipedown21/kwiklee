const electron = require('electron');
const shellcmd = require('shelljs');
const fs = require('fs');
const { join } = require('path');
const { spawn } = require ('child_process');
const { app, BrowserWindow, Menu, ipcMain, shell } = electron;

const SERVER_SETUP = 'server:setup';
const STAGE_COMPLETE = 'stage:complete';
const FETCH_MOCKSERVERS = 'fetch:mockServers';
const FETCH_MOCKSERVERS_COMPLETE = 'fetch:mockServers:complete';
const SERVER_OPEN = 'server:open';
const SERVER_DELETE = 'server:delete';
const SERVER_DELETE_COMPLETE = 'server:delete:complete';

const INSTALL_JSON_SERVER = 'npm install --save json-server';
const APP_DIRECTORY = '/Kwiklee';
const SETUP_PATH = app.getPath('documents');
const APP_PATH = SETUP_PATH + APP_DIRECTORY;
const SERVER_DIRECTORY = '/MockServers/';
const DB_STRING = '{\n\t "$artifact$": []\n}';
let port = '4000';


let mainWindow;

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      { label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
        app.quit();
        }
      }
    ]
  }
];

if(process.platform === 'darwin') {
menuTemplate.unshift({
  label: ''
});
}


/* Code required to debug with dev tools, reload with Command+R*/

if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
      label: 'View',
      submenu: [
        { role: 'reload' },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Alt+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }


app.on('ready', () => {
  shellcmd.mkdir('-p', APP_PATH + SERVER_DIRECTORY);
  const contents = fs.readdirSync(APP_PATH);

  if(contents.length === 1) {
          console.log('Project has been setup.');
  }


  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    resizable: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function dbStructureGenerator(artifact) {
  return DB_STRING.replace('$artifact$', artifact);
}

ipcMain.on(SERVER_SETUP, (event, serverName, artifactName) => {
  shellcmd.cd(APP_PATH + SERVER_DIRECTORY);
  shellcmd.mkdir('-p', serverName);
  mainWindow.webContents.send(STAGE_COMPLETE);

  shellcmd.cd(serverName);
  shellcmd.config.execPath = shellcmd.which('node');
  shellcmd.exec('npm init -y');
  mainWindow.webContents.send(STAGE_COMPLETE);

  shellcmd.config.execPath = shellcmd.which('node');
  shellcmd.exec(INSTALL_JSON_SERVER);
  mainWindow.webContents.send(STAGE_COMPLETE);

  shellcmd.touch('db.json');
  shellcmd.echo(dbStructureGenerator(artifactName)).to('db.json');
  mainWindow.webContents.send(STAGE_COMPLETE);

  shellcmd.sed('-i', '\"test\".*', `\"db\": \"json-server -w db.json --port ${port}\"`, 'package.json');

  shellcmd.config.execPath = shellcmd.which('node');
  const child = spawn('npm', ['run', 'db']);

  mainWindow.webContents.send(STAGE_COMPLETE);

  shell.openExternal(`http://localhost:${port}`);
  port++;
});

ipcMain.on(FETCH_MOCKSERVERS, (event) => {
  const mockServers = fs.readdirSync(APP_PATH + SERVER_DIRECTORY);

  mainWindow.webContents.send(FETCH_MOCKSERVERS_COMPLETE, mockServers);
});

ipcMain.on(SERVER_OPEN, (event, server) => {
  shell.openItem(APP_PATH + SERVER_DIRECTORY + server);
});

ipcMain.on(SERVER_DELETE, (event, server) => {
  shellcmd.cd(APP_PATH + SERVER_DIRECTORY);
  shellcmd.rm('-fr', server);

  mainWindow.webContents.send(SERVER_DELETE_COMPLETE);
});
