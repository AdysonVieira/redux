const MUDAR_COR = 'change-color/MUDAR_COR'

export const mudar = (payload) => ({ type: MUDAR_COR, payload})

const reducer = ( state = 'blue', action ) => {
  switch (action.type) {
    case MUDAR_COR:
      return action.payload
    default:
      return state
  }
}

export default reducer;