import { combineReducers } from 'redux';
import serverPipelineReducer from './server_pipeline_reducer';
import mockServersReducer from './mock_servers_reducer';

export default combineReducers({
  serverPipeline: serverPipelineReducer,
  mockServers: mockServersReducer
});
