// Prepare #############
// No createSlice, podemos dividir o reducer em 2 métodos, reducer e prepare. O prepare é utilizado para preparar o objeto criado pela ação. Só é possível retornar através do prepare, as propriedades {payload, meta, error}

import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'contador',
  initialState: 0,
  reducers: {
    somar: {
      reducer: (state, action) => state + action.payload,
      prepare(payload) {
        return { payload, meta: 'local' };
      },
    },
  },
});