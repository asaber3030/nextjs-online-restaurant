import { FullOffer } from "@/types";

import { storageOfferCartName } from "@/lib/constants";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialCartState: FullOffer[] = JSON.parse(localStorage.getItem(storageOfferCartName) ?? JSON.stringify([]))

const saveToStorage = (state: FullOffer[]) => {
  localStorage.setItem(storageOfferCartName, JSON.stringify(state))
}

const orderOfferSlice = createSlice({
  name: "orderOfferCart",
  initialState: initialCartState,
  reducers: {
    addOfferToCart: (state, { payload }: { payload: FullOffer }) => {
      const findItem = state.find(item => item.id === payload.id) 
      if (!findItem) {
        state = [...state, payload]
        toast.message("Offer has been added to cart successfully!")
      }
      saveToStorage(state)
      return state
    },
    removeOfferFromCart: (state, { payload }: { payload: number }) => {
      const findItem = state.find(item => item.id === payload) 
      if (findItem) {
        state = state.filter(item => item.id !== payload)
        toast.message("Offer has been removed from cart.")
      }
      saveToStorage(state)
      return state
    },
    emptyOfferCart: (state) => {
      state = []
      saveToStorage(state)
      return state
    }
  }
})

export default orderOfferSlice.reducer
export const { addOfferToCart, removeOfferFromCart, emptyOfferCart } = orderOfferSlice.actions
