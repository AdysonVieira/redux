// Action ######
// Para atualizarmos o estado, enviamos uma ação action através da store utilizando o método dispatch. Uma ação é sempre um objeto que contem o tipo type e um valor caso necessário payload. No reducer verificamos o tipo de ação enviada e retornamos o novo estado a partir disso.

function reducer(state = 10, action) {
  if (action.type == 'somar') {
    return state + action.payload;
  } else {
    return state
  }
}

const $store = Redux.createStore(reducer);

let state = $store.getState();
console.log(state); // 10

// Envia um objeto com type e payload para o reducer
store.dispatch({type: 'somar', payload: 25})

state = store.getState()
console.log(state); // 35



// Constantes ######
// O tipo type da ação é sempre uma string que identifica a mesma. Por ser uma string, o utilizador das mesmas pode acabar cometendo um erro de digitação, introduzindo assim um bug ao aplicativo. Para evitar esse problema é comum criarmos constantes para os nomes de cada ação que possuirmos.

const INCREMENTAR = 'INCREMENTAR';
const REDUZIR = 'REDUZIR';
const SOMAR = 'SOMAR';

function reducer(state = 0, action) {
  if (action.type === INCREMENTAR) {
    return state + 1;
  }
  if (action.type === REDUZIR) {
    return state - 1
  }
}

// Action Creator ######
// Mais uma prática comum para facilitar o uso de ações é a criação de funções que retornam o objeto da ação. Essas são chamadas de Action Creators.

function incrementar() {
  return { type: INCREMENTAR }
}

function reduzir() {
  return { type: REDUZIR }
}

function somar(payload) {
  return { type: SOMAR, payload }
}

const store = Redux.createStore(reducer)
store.dispatch(incrementar())
store.dispatch(reduzir())
store.dispatch(somar())
state = store.getState()
console.log(state)