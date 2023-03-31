const INCREMENTAR_TEMPO = 'aluno/INCREMENTAR_TEMPO'
const REDUZIR_TEMPO = 'aluno/REDUZIR_TEMPO'
const MODIFICAR_EMAIL = 'aluno/MODIFICAR_EMAIL'

export const incrementarTempo = () => {
  return { type: INCREMENTAR_TEMPO }
}

export const reduzirTempo = () => {
  return { type: REDUZIR_TEMPO }
}

export const modificarEmail = (payload) => {
  return { type: MODIFICAR_EMAIL, payload}
}

const initalState = {
  nome: 'Adyson',
  email: 'contato.adyson@gmail.com',
  diasRestantes: 120
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case INCREMENTAR_TEMPO:
      return { ...state, diasRestantes: state.diasRestantes + 1 }
    case REDUZIR_TEMPO:
      return { ...state, diasRestantes: state.diasRestantes - 1 }
    case MODIFICAR_EMAIL:
      return { ...state, email: action.payload }
    default:
      return state
  }
}

export default reducer;