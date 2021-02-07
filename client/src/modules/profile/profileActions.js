import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './profileTypes';
import { GET_ERRORS, CLEAR_ERRORS } from '../error/errorTypes';

// Get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get('http://localhost:5000/api/profiles/profile');
    // console.log(res)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(emptyProfile());
  };
};

// Create standard profile
export const createUserProfile = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.post('http://localhost:5000/api/profiles/user_profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(emptyProfile());
  };
};

// Ask for registration to be able to share job objects
export const askForRegistration = (userId) => async dispatch => {
  try { 
    dispatch(setProfileLoading());
    const res = await axios.put('http://localhost:5000/api/profiles/registration', {_id: userId });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(emptyProfile());
  };
};

// Accept request (register user, give permission to share job objects)
export const registerUser = userId => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.put('http://localhost:5000/api/admin/register', { id: userId });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch(emptyProfile());
  };
};

// Get jobs (if you are registered)
export const getJobs = () => async dispatch => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get('http://localhost:5000/api/jobs/jobs');
    dispatch({
      type: GET_PROFILE,
      payload: { jobs: res.data }
    });
  } catch (err) {
    dispatch(emptyProfile());
  };
};

// Add new job
export const addJob = jobData => async dispatch => {
  try {
    console.log(jobData)
    await axios.post('http://localhost:5000/api/jobs/job', jobData);
    dispatch(getJobs()); // Refetch all jobs
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data })
  };
};

// Handle payment by stripe
export const handlePayment = paymentData => async dispatch => {
  try {
    await axios.put('http://localhost:5000/api/profiles/payment', paymentData);
    dispatch(getCurrentProfile());
  } catch (err) {
    console.log(err);
  };
};

// Add opinion
export const addOpinion = opinionData => async dispatch => {
  console.log(opinionData)
  try {
    await axios.put('http://localhost:5000/api/profiles/opinion', opinionData);
    dispatch(getCurrentProfile());
  } catch (err) {
    console.log(err);
  };
};

// Profile loading
export const setProfileLoading = () => ({ type: PROFILE_LOADING });

// Clear profile
export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

// Empty profile
export const emptyProfile = () => ({ type: GET_PROFILE, payload: {} });

// Clear errors
const clearErrors = () => ({ type: CLEAR_ERRORS });