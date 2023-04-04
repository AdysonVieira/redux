// Provider #######
// Para podermos ter acesso ao dispatch e a store dentro dos componentes React, precisamos encapsular todo o aplicativo dentro do componente Provider que é disponibilizado pelo react-redux.

import { Provider, useDispatch, useSelector } from 'react-redux'

<Provider store={store}>
  <App />
</Provider>



// useSelector ########
// O hook useSelector é utilizado para termos acesso ao estado do Redux em qualquer local da nossa aplicação

const state = useSelector((state) => state)



// useDispatch ########
// O hook useDispatch é usado para despacharmos ações para nossa store

const dispatch = useDispatch()



// Toolkit
// npm i @reduxjs/toolkit



// configureStore #########
// O configureStore automaticamente configura middlewares como o redux-thunk e também a devtools.

// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import contador from './..'

const store = configureStore({ reducer: contador });

export default store;




// createAction #######
import { createAction } from '@reduxjs/toolkit'

const incrementar = createAction('INCREMENTAR')




// createSlice #########
// Aqui está a mágica do toolkit. O createSlice irá criar o reducer e as ações utilizando uma única função. Ele também irá definir um namespace para as ações e configura automaticamente o immer permitindo assim a mutação do estado dentro do reducer.

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'contador',
  initalState: {
    total: 0,
  },
  reducers: {
    incrementar(state) {
      state.total++;
    },
    reduzir(state) {
      state.total--
    }
  }
})
export const { incrementar, reduzir } = slice.actions;
export default slice.reducer;



// middleware ######

// configureStore.js

import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const reducer = combineReducers({ contador, modal });
const middleware = [ ...getDefaultMiddleware(), logger];
const store = configureStore({ reducer, middleware })