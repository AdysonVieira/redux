// Switch ########
// É comum o uso do switch statement dentro do reducer ao invés do uso de if/else. Serve apenas para facilicar a leitura e evitar a repetição do action.type

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'REDUZIR':
      return state - 1;
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);




// combineReducers #########
// Podemos dividir o código do reducer em diferentes funções e combiná-las ao final. Vale lembrar que ao final o reducer sempre será único e toda ação despachada irá passar por todos os reducers.

function contador(state = 0, action) {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    case 'REDUZIR':
      return state - 1;
    default:
      return state;
  };
};

function modal(state = false, action) {
  switch (action.type) {
    case 'ABRIR':
      return true;
    case 'FECHAR':
      return false;
    default: 
      return state;
  };
};

const reducer = Redux.combineReducers({ contador, modal });
const $store = Redux.createStore(reducer);

const state = store.getState()
console.log(state); // { contador: 0, modal: false}

// podendo desestrurar
const { contador, modal } = store.getState()