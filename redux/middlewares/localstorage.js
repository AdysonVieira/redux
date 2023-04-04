// localStorage #######
// Gravar algo no localStorage é um side-effect, assim como a manipulação do DOM, para isso podemos criar um middleware que irá lidar com a situação.

// middleware
const _localStorage = (store) => (next) => (action) => {
  const response = next(action);
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload),
    )
  }
  return response
}

// -------------------

function getLocalStorage(key, initial) {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (err) {
    return initial
  }
}

const initalState = {
  loading: false,
  data: getLocalStorage('data', null),
  error: null
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'FETCH_ERROR':
      return {data: null, loading: false, error: action.payload }
    default:
      return state
  }
}

 
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action)
}

const localStorage = (store) => (next) => (action) => {
  const response = next(action);
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload),
    )
  }
  return response
}

const { applyMiddleware, compose} = Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));
const store = store.createStore(reducer, enhancer)


function fetchUrl(url) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'FETCH_STARTED' }) // loading
      const data = fetch('url...').then((r) => r.json())
      dispatch({ type: 'FETCH_SUCCESS', payload: data, localStorage: 'data' }) // data
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err}) // error
    }
  }
}

fetchUrl('url...')