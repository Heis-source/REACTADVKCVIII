import { SET_CURRENT_USER, SET_ADS } from "./types";
import axios from "axios";

// Register User
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


// Login - get user token
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


// Set logged in user
export const setCurrentUser = email => {
  return {
    type: SET_CURRENT_USER,
    payload: email
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("username");
  // Remove auth header for future requests

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};


export const adsNoFilter = () => dispatch => {
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

export const setCurrentAds = payload => {
  return {
    type: SET_ADS,
    payload
  };
};