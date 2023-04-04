const FETCH_STARTED = 'token/FETCH_STARTED'
const FETCH_SUCCESS = 'token/FETCH_SUCCESS'
const FETCH_ERROR = 'token/FETCH_ERROR'

const tokenFetchStarted = () => {
  return { type: FETCH_STARTED }
}

const tokenFetchSuccess = (payload) => {
  return { type: FETCH_SUCCESS, payload, localStorage: 'token' }
}

const tokenFetchError = (payload) => {
  return { type: FETCH_ERROR, payload }
}

function getTokenLocalStorage(key, initial) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return initial
  }
}

const initialState = {
  loading: false,
  token: getTokenLocalStorage('token', null),
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED: 
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { ...state, token: action.payload, loading: false }
    case FETCH_ERROR:
      return { loading: false, token: null, error: action.payload }
    default:
      return state
  }
}

export const fetchToken = (url, user) => {
  return async (dispatch) => {
    try {
      // Inicia Loading
      dispatch(tokenFetchStarted())

      // Faz Fetch
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      }) 
      const { token } = await response.json()

      // Seta o fetch para o reducer
      dispatch(tokenFetchSuccess(token))
    } catch (err) {
      dispatch(tokenFetchError(err.message))
    }
  }
}

export default reducer;