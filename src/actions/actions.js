import { SET_CURRENT_USER, SET_ADS } from "./types";
import axios from "axios";

export const registerUser = (email, pass, history) => () => {
    axios.post('http://34.89.93.186:8080/apiv1/register' , {
        username: email,
        password: pass
    })
    .then(() => {
      history.push('/login');
    })
    .catch(() => {
      alert("Something is wrong! Try again!");
    })
};


export const loginUser = (email, pass) => dispatch => {
    axios.post('http://34.89.93.186:8080/apiv1/login' , {
      username: email,
      password: pass
    })
    .then(() => {
      localStorage.setItem("username", email);
      dispatch(setCurrentUser(email));
    })
    .catch(() => {
        alert("Ah ah ah, you didn't say the magic word -> Dennis Nedry <-");
    })
};


export const setCurrentUser = email => {
  return {
    type: SET_CURRENT_USER,
    payload: email
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem("username");
  dispatch(setCurrentUser({}));
};


export const adsNoFilter = () => dispatch => {
  axios.defaults.withCredentials = true;
  axios.get('http://34.89.93.186:8080/apiv1/anuncios')
  .then(res => {
    const data = res.data.results;
    dispatch(setCurrentAds(data));
  })
  .catch(() => {
      alert("Ah ah ah, you didn't say the magic word -> Dennis Nedry <-");
  })
};


export const setCurrentAds = payload => {
  return {
    type: SET_ADS,
    payload
  };
};