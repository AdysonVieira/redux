import token from './token.js'
import user from './user.js'
import thunk from './middlewares/thunk.js'
import local from './middlewares/local.js'

const middleware = Redux.applyMiddleware(thunk, local)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
const enhancer = composeEnhancers(middleware)
const reducer = Redux.combineReducers({ user, token })
const store = Redux.createStore(reducer, enhancer)

export default store;