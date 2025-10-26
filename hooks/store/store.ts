
import { configureStore } from '@reduxjs/toolkit'

import cartSlices from './slices/cart-slices'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import checkoutSlices from './slices/checkout'
export const store = configureStore({
    reducer: {
        cart: cartSlices,
        checkout: checkoutSlices,
    },
})

// export type AppStore = ReturnType<typeof store.subscribe>
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector