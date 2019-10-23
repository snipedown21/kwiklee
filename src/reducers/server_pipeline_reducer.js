import _ from 'lodash';
import {
  INCREMENT_SERVER_PIPELINE,
  RESET_PIPELINE
} from '../actions/types';

const INITIAL_STATE = {
  current: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT_SERVER_PIPELINE:
      return { current: state.current + 1 };
    case RESET_PIPELINE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
