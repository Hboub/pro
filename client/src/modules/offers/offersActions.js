import axios from "axios";
import { SET_ORDER } from "../order/orderTypes";
import { OFFERS_LOADING, SET_OFFERS, GET_OFFER } from "./offersTypes";

// Search for results
export const searchForOffers = (searchData, orderData) => async (dispatch) => {
  console.log(searchData)
  console.log(orderData)
  try {
    dispatch(setSearchLoading());
    const res = await axios.post(
      "http://localhost:5000/api/offers/search",
      searchData
    );
    dispatch({
      type: SET_ORDER,
      payload: orderData,
    });
    dispatch({
      type: SET_OFFERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Filter offers
export const filterOffers = (
  filters = [],
  limit = 8,
  skip = 0,
  searchData,
  prevState = []
) => async (dispatch) => {
  const data = { filters, limit, skip, searchData };

  console.log(data);
  
  try {
    dispatch(setSearchLoading());
    const res = await axios.post(
      "http://localhost:5000/api/offers/filter",
      data
    );
    dispatch({
      type: SET_OFFERS,
      payload: [...prevState, ...res.data],
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOffer = (id) => async (dispatch) => {
  try {
    await getJob();
    dispatch(setSearchLoading());
    const res = await axios.get(`http://localhost:5000/api/offers/offer/${id}`);
    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//get the job
export const getJob = () => async (dispatch) => {
  try {
    console.log("houni");
    dispatch(setSearchLoading());
    const res = await axios.get(`http://localhost:5000/api/jobs/getjobs`);
    dispatch({
      type: GET_OFFER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Searching ...
export const setSearchLoading = () => ({ type: OFFERS_LOADING });
