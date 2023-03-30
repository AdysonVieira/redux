// Organização #######
// Existem diferentes formas de organizarmos os arquivos do Redux. Utilizaremos o padrão ducks, onde vamos manter as ações e o reducer relacionado em um mesmo arquivo.

// https://github.com/erikras/ducks-modular-redux

// contador.js
// Contant
const INCREMENTAR = 'contador/INCREMENTAR';
const REDUZIR = 'contador/REDUZIR';

// Action Creator
export const incrementar = () => {{ type: INCREMENTAR }};
export const reduzir = () => {{ type: REDUZIR }};

// Inital State
const initialState = 0;

// Reducer
const reducer = ( state = initialState, action) => {
  switch (action.type) {
    case INCREMENTAR:
      return state + 1;
    case REDUZIR:
      return state - 1;
    default:
      return state;
  }
}

export default reducer;
