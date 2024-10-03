import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const shoppingCartSheetSlice = createSlice({
  name: "shoppingCartSheet",
  initialState: initialState,
  reducers: {
    trigger: (state) => {
      state = !state
      return state
    }
  }
})

export default shoppingCartSheetSlice.reducer
export const { trigger } = shoppingCartSheetSlice.actions
