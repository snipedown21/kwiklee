import {
  INCREMENT_SERVER_PIPELINE,
  FETCH_MOCK_SERVERS_COMPLETED,
  RESET_PIPELINE } from "./types";
import { ipcRenderer } from 'electron';
import { message } from 'antd';
import {
  SERVER_SETUP,
  STAGE_COMPLETE,
  FETCH_MOCKSERVERS,
  FETCH_MOCKSERVERS_COMPLETE,
  SERVER_OPEN,
  SERVER_DELETE, } from '../constants';

export const setupServer = (serverName, artifactName) => dispatch => {
  ipcRenderer.send(SERVER_SETUP, serverName, artifactName);

  ipcRenderer.on(STAGE_COMPLETE, (event) => {
    dispatch({ type: INCREMENT_SERVER_PIPELINE });
  });
};

export const fetchMockServers = () => dispatch => {
  ipcRenderer.send(FETCH_MOCKSERVERS);

  ipcRenderer.on(FETCH_MOCKSERVERS_COMPLETE, (event, servers) => {
    dispatch({ type: FETCH_MOCK_SERVERS_COMPLETED, payload: servers });
  });
}

export const handleServerOpen = (server) => dispatch => {
  ipcRenderer.send(SERVER_OPEN, server);
};

export const handleServerDelete = (server) => dispatch => {
  ipcRenderer.send(SERVER_DELETE, server);
};

export const resetPipelines = () => dispatch => {
  dispatch({ type: RESET_PIPELINE });
};
