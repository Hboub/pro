import * as types from './errorTypes';

// eslint-disable-next-line
export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.GET_ERRORS:
      return payload;

    case types.CLEAR_ERRORS:
      return {}

    default:
      return state;
  };
};