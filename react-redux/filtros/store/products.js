import { createSlice } from "@reduxjs/toolkit";
import data from './data';

const slice = createSlice({
  name: 'products',
  initialState: {
    data,
    filters: {
      color: [],
      prices: {
        max: 0,
        min: 0,
      }
    }
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filters[action.payload.name] = action.payload.value
    },
  }
})

export const { changeFilter } = slice.actions

export default slice.reducer

export const mapColors = (state) => {
  const { data } = state.products
  return Array.from(new Set(data.map((item) => item.color)))
}