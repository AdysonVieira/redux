const FETCH_STARTED = 'user/FETCH_STARTED'
const FETCH_SUCCESS = 'user/FETCH_SUCCESS'
const FETCH_ERROR = 'user/FETCH_ERROR'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.payload) {
    case FETCH_STARTED:
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { ...state, data: action.payload, loading: false }
    case FETCH_ERROR:
      return {loading: false, data: {}, error: null}
    default:
      return state
  }
}

export const fetchUser = (url, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_STARTED })
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const data = await response.json()
      dispatch({ type: FETCH_SUCCESS, payload: data })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err})
    }
  }
}

export default reducer