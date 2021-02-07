import { SET_OFFERS, OFFERS_LOADING, GET_OFFER } from './offersTypes';

const initialState = {
  offers: [],
  offer: null,
  loading: false
};

// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_OFFERS:
      return {
        ...state,
        offers: payload,
        loading: false
      };

    case OFFERS_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_OFFER:
      return {
        ...state,
        offer: payload,
        loading: false
      };

    default:
      return state;
  };
};