import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import errorReducer from './error/errorReducer';
import profileReducer from './profile/profileReducer';
import orderReducer from './order/orderReducer';
import offersReducer from './offers/offersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  order: orderReducer,
  offers: offersReducer
});