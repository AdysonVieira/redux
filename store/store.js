// Store ########
// Primeiro iniciamos nossa store com Redux.createStore(). Astore dá acesso ao estado global e permite despacharmos ações que modificam o mesmo. É essencial passarmos uma função como primeiro argumento do createStore, essa função é chamada de reducer. O reducer é a função responsável por retornar o estado atual da store.

function reducer() {
  return {
    nome: 'Adyson',
    id: 27,
  };
};

const store = Redux.createStore(reducer);





// Reducer #######
// A função de reducer recebe dois argumentos principais, o primeiro sendo o estado atual state e o segundo uma ação action que será utilizado para identificarmos as ações despachadas pela store.

// const initialState = {
//    nome: 'Adyson',
//    id: 27,
//  };

const initialState = 10

function reducer(state = initialState, action) {
  return state;
};

const $store = Redux.createStore(reducer);
const state = store.getState();
console.log(state); // 10

// O estado inicial também pode ser passado direto no createStore
// const store = Redux.createStore(reducer, 10);