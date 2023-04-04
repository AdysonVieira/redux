const local = (store) => (next) => (action) => {
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload)
      )
  }
}

export default local