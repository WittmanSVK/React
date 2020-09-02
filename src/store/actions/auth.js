import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
      type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: token,
      userId: userId
  }
};

export const authFail = (error) => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime* 1000)
    };
};

export const logout = () => {
    return {type: actionTypes.AUTH_LOGOUT};
};

export const auth = (email, password, isSignUP) => {
  return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDevAKN2-tI2FitHrQaklUgWROdAqB31ak';
        if (!isSignUP){
           url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDevAKN2-tI2FitHrQaklUgWROdAqB31ak';
        }
        axios.post(url, authData)
            .then( response => {
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
                })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path
  }
};