import contador from './contador.js'
import mudaCor from './change-color.js';

const reducer = Redux.combineReducers({ contador, mudaCor })

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;
