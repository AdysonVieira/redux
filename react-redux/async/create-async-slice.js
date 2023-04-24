// createAsyncSlice ########
// Toda vez que identificamos um padrão sendo repetido, existe uma opotunidade de otimização do código através de uma função.

// importa o createSlice
import { createSlice } from '@reduxjs/toolkit';

// tipagem
/**
 * @param {Object} config 
 * @param {String} config.name 
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 * @returns {Object}
 */

// recebe um objeto de configuração
const createAsyncSlice = (config) => {

  // cria um slice
  const slice = createSlice({
    nome: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState
    },
    reducers: {
      fetchStarted(state) {
        return { ...state, loading: true }
      },
      fetchSuccess(state, action) {
        return { ...state, data: action.payload}
      },
      fetchError(state, action) {
        return { loading: false, data: null, error: action.payload}
      },
      ...config.reducers,
    },
  });
  
  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;
  
  // cria uma função que retorna uma função assíncrona
  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const {url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      return dispatch(fetchSuccess(data));
    } catch (error) {
      return dispatch(fetchError(error));
    };
  }; 
  
  return { ...slice, asyncAction };
};

export default createAsyncSlice;


// -------------------------------------------


// login.js
import { combineReducers } from '@reduxjs/toolkit'
import createAsyncSlice from '...'

const token = createAsyncSlice({
  nome: 'token',
  fetchConfig: (user) => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }
  })
})

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      }
    },
  })
})

export const fetchToken = token.asyncAction;
export const fetchUser = user.asyncAction;

export const reducer_ = combineReducers({token: token.reducer, user: user.reducer})


export const login = (user) => async (dispatch) => {
  try {
    const { token } = await dispatch(fetchToken(user))
    if (token !== undefined) await dispatch(fetchUser(token))
  } catch (error) {

  }
}

