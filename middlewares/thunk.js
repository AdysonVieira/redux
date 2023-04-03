// Operações assíncronas ######
// O reducer deve ser uma função pura, sem efeitos colaterais. Por isso não fazemos requisições http diretamente no mesmo.


// Errado
function _reducer(state = null, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      // fetch é um efeito colateral
      const data = fetch('url...').then((res) => res.json());
      // data é uma Promise
      return data
    default:
      return state
  }
}


// Modelo de reducer com fetch #################

const _initalState = {
  loading: false,
  data: null,
  error: null
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, loading: true}
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'FETCH_ERROR':
      return {data: null, loading: false, error: action.payload }
    default:
      return state
  }
}


const _store = store.createStore(reducer)
async function fetchUrl(dispatch, url) {
  try {
    dispatch({ type: 'FETCH_STARTED' })
    const data = fetch('url...').then((r) => r.json())
    dispatch({ type: 'FETCH_SUCCESS', payload: data })
  } catch (err) {
    dispatch({ type: 'FETCH_ERROR', payload: err})
  }
}

fetchUrl(store.dispatch, 'url...')



// Redux Thunk #######
// Podemos utilizar um middleware para contornar a obrigação de sempre enviarmos objetos via dispatch. No middleware podemos identificar a action, e verificar se a mesma é uma função. Caso ela seja uma função podemos ativá-la.

const initalState = {
  loading: false,
  data: null,
  error: null
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, loading: true}
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'FETCH_ERROR':
      return {data: null, loading: false, error: action.payload }
    default:
      return state
  }
}

// O reducer não recebe promessas ou algo assíncrono, então passamos no meio da chamada do reducer, atráves de um middleware 
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') { // intercepta e executa a função assíncrona antes de ir para o reducer.
    return action(store.dispatch);
  }
  return next(action) // após receber uma reposta da função asyn é que envia a resposta para o reducer
}


const { applyMiddleware, compose} = Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = store.createStore(reducer)



function fetchUrl(url) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'FETCH_STARTED' }) // loading
      const data = fetch('url...').then((r) => r.json())
      dispatch({ type: 'FETCH_SUCCESS', payload: data }) // data
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err}) // error
    }
  }
}

fetchUrl('url...')
