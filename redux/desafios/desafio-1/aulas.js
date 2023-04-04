const COMPLETAR_AULA = 'aulas/COMPLETAR_AULA'
const COMPLETAR_CURSO = 'aulas/COMPLETAR_CURSO'
const RESETAR_CURSO = 'aulas/RESETAR_CURSO'

export const completarAula = (payload) => {
  return { type: COMPLETAR_AULA, payload }
}

export const completarCurso = () => {
  return { type: COMPLETAR_CURSO }
}

export const resetarCurso = () => {
  return { type: RESETAR_CURSO}
}

const initialState = [
  {
    id: 1,
    nome: 'Design',
    completa: true,
  },
  {
    id: 2,
    nome: 'HTML',
    completa: false,
  },
  {
    id: 3,
    nome: 'CSS',
    completa: false,
  },
  {
    id: 4,
    nome: 'JavaScript',
    completa: false,
  },
]

const reducer = immer.produce((state = initialState, action) => {
  switch (action.type) {
    case COMPLETAR_AULA:
      const index = state.findIndex((i) => i.id === action.payload)
      if (!isNaN(index))
      state[index].completa = true
      break
    case COMPLETAR_CURSO:
      state.forEach((item) => item.completa = true)
      break
    case RESETAR_CURSO:
      state.forEach((item) => item.completa = false)
      break
    default:
      return state
  }
}, initialState)

export default reducer;