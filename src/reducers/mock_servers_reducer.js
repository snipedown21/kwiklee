import {
  FETCH_MOCK_SERVERS_COMPLETED
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_MOCK_SERVERS_COMPLETED:
      return action.payload;
    default:
      return state;
  }
}
