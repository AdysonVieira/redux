// applyMiddleware ########
// O Middleware ocorre entre o momento que a ação é disparada e antes dela chegar ao reducer. Ele é aplicado através da função Redux.applyMiddleware

// considere esse reducer para os próximos exemplos

import Redux, { compose } from '../redux.min.js'
function reducer (state = 0, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'REDUZIR':
      return state - 1;
    default:
      return state;
  }
}

const logger = (store) => (next) => (action) => {
  console.log(action)
  return next(action)
}

const reduzirMiddle = (store) => (next) => (action) => {
  if (action.type === 'REDUZIR') window.alert('REDUZIU')
  return next(action)
}

const middleware = Redux.applyMiddleware(logger, reduzirMiddle)
const enhancer = composeEnhancers(middleware)
const store = Redux.createStore(reducer, enhancer)

store.dispatch({ type: 'INCREMENTAR' })



// Compose #######
// O segundo ou terceiro argumento de createStore é considerado um enhacer. Assim como um middleware, a função do devtools também é um enhancer da store. Para passarmos mais de um devemos utilizar a função composeEnhancers()