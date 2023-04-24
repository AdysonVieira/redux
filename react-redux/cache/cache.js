// Cache ##########
// Podemos criar um estado interno que controla se uma ação assíncrona deve ser despachada ou não, baseado no tempo em que a mesma foi despachada.

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      lastUpdate: 0,
      cache: 60000,
      ...config.initialState
    },
    reducers: {
      fetchStarted: (state) => {
        state.loading = true;
      },
      fetchSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError: (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      updateTime: (state, action) => {
        state.lastUpdate = action.payload;
      },
      ...config.reducers
    },
  });

  const { fetchError, fetchStarted, fetchSuccess, updateTime } = slice.actions;

  const asyncAction = (payload) => async (dispatch, getState) => {
    const { lastUpdate, cache } = getState()[slice.name];
    if (lastUpdate > Date.now() - cache) return;
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      dispatch(updateTime(Date.now()))
      return dispatch(fetchSuccess(data))
    } catch (error) {
      return dispatch(fetchError(error.message))
    }
  }

  return {...slice, asyncAction}
}

export default createAsyncSlice;