import { SET_ORDER } from './orderTypes';

const initialState = {
  checkIn: null,
  checkOut: null,
  city: '',
};

// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ORDER:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  };
};