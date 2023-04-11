// Async ##########
// O Redux Thunk já é configurado automaticamente através do Toolkit. Podemos definir a ação ass´ncrona da mesma forma que definimos sem o React, fora do slice


// login.js
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'login',
  initialState: {
    user: {
      loading: false,
      data: null,
      error: null,
    },
    token: {
      loading: false,
      data: null,
      error: null,
    }
  },
  reducers: {
    fetchTokenStarted(state) {
       return { ...state.token, loading: true }
    },
    fetchTokenSuccess(state, action) {
      return { ...state.token, data: action.payload, loading: false }
    },
    fetchTokenError(action) {
      return { loading: false, data: null, error: action.payload}
    },
    fetchUserStarted(state) {
    return { ...state.user, loading: true }
    },
    fetchUserSuccess(state, action) {
      return { ...state.user, data: action.payload, loading: false }
    },
    fetchUserError(action) {
      return { loading: false, data: null, error: action.payload}
    }
  }
});

export const { fetchTokenStarted, fetchTokenSuccess, fetchTokenError, fetchUserStarted, fetchUserSuccess, fetchUserError } = slice.actions;

export const fetchToken = (user) => async (dispatch) => {
  try {
    dispatch(fetchTokenStarted());
    const response = await fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    const data = await response.json()
    return dispatch(fetchTokenSuccess(data));
  } catch (error) {
    return dispatch(fetchTokenError(error));
  }
}

export const fetchUser = (token) => async (dispatch) => {
  try{
    dispatch(fetchUserStarted());
    const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    return dispatch(fetchUserSuccess(data));
  } catch (error) {
    return dispatch(fetchUserError(error));
  }
}

export const login = (user) => async (dispatch) => {
  try {
    const { payload } = await dispatch(fetchToken(user))
    if (payload.token !== undefined) await dispatch(fetchUser(payload.token))
  } catch {

  }
}

export default slice.reducer