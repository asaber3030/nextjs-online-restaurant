import { storageCartName } from "@/lib/constants";
import { CartItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialCartState: CartItem[] = JSON.parse(localStorage.getItem(storageCartName) ?? JSON.stringify([]))

const saveToStorage = (state: CartItem[]) => {
  // @ts-nocheck
  localStorage.setItem(storageCartName, JSON.stringify(state))
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, { payload }: { payload: CartItem }) => {
      const findItem = state.find(item => item.id === payload.id) 
      if (!findItem) {
        state = [...state, payload]
        toast.message("Item has been added to cart successfully!")
      }
      saveToStorage(state)
      return state
    },
    removeFromCart: (state, { payload }: { payload: number }) => {
      const findItem = state.find(item => item.id === payload) 
      if (findItem) {
        state = state.filter(item => item.id !== payload)
        toast.message("Item has been removed from cart.")
      }
      saveToStorage(state)
      return state
    },
    increaseQuantity: (state, { payload }: { payload: number }) => {
      const findItem = state.find(item => item.id === payload) 
      const itemIdx = state.findIndex(item => item.id === payload) 
      if (findItem) {
        state[itemIdx] = { 
          ...findItem,
          quantity: findItem.quantity + 1,
          totalPrice: (findItem.quantity + 1) * findItem.unitPrice
        }
      }
      saveToStorage(state)
      return state
    },
    decreaseQuantity: (state, { payload }: { payload: number }) => {
      const findItem = state.find(item => item.id === payload) 
      const itemIdx = state.findIndex(item => item.id === payload) 
      if (findItem) {
        state[itemIdx] = { 
          ...findItem,
          quantity: findItem.quantity === 1 ? 1 : findItem.quantity - 1,
          totalPrice: (findItem.quantity === 1 ? 1 : findItem.quantity - 1) * findItem.unitPrice
        }
      }
      saveToStorage(state)
      return state
    },
    emptyCart: (state) => {
      state = []
      saveToStorage(state)
      return state
    },
  }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, emptyCart } = cartSlice.actions
