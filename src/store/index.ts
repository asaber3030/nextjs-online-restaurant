import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './slices/cart.slice'
import orderOfferReducer from './slices/order-offer.slice'
import shoppingCartSheetReducer from './slices/shopping-cart-sheet.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      orderOfferCart: orderOfferReducer,
      shoppingCartSheet: shoppingCartSheetReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

