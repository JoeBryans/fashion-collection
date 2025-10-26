import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import  { ProductType } from '@/lib/types'
import { int } from 'zod'
import { clear } from 'console'

export interface CartItem {
    id: string
    name: string
    price: number
    images: [
        {
            url: string
        }
    ]
    quantity: number
    discount: number
    color: string
    size: string
}

export interface CartState {
    cart: {
        cartItems: CartItem[]
        totalPrice: number
        totalQuantity: number
    }
}


const initialState  = {
    cart:{
        cartItems:[] as CartItem[],
        totalPrice:0,
        totalQuantity:0,
    } ,
}

if (typeof window !== 'undefined') {
    const localStorage = window.localStorage
    const cart = localStorage.getItem('cart')
    if (cart) {
        initialState.cart = JSON.parse(cart)
    }
}
const cartSlices = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem >) => {
            const existingItem = state.cart.cartItems.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += 1
            }
            else {
                state.cart.cartItems.push(action.payload)
            }
            state.cart.totalPrice = state.cart.cartItems.reduce((acc, curr) => acc + curr.price, 0)
            state.cart.totalQuantity = state.cart.cartItems.length

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },

        decreaseCartItemQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const existingItem  = state.cart.cartItems.find((item) => item.id === action.payload.id)
            if (existingItem?.quantity as number > 1) {
                                existingItem!.quantity -= 1 
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        
        removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
            const existingItem = state.cart.cartItems.filter((item) => item.id !== action.payload.id)
            state.cart.cartItems = existingItem
            localStorage.setItem('cart', JSON.stringify(state.cart))

    },
    clearCart: (state) => {
        state.cart.cartItems = []
        state.cart.totalPrice = 0
        state.cart.totalQuantity = 0
        localStorage.removeItem('cart')
    }
}

})



 export const { addToCart,removeFromCart,clearCart,decreaseCartItemQuantity } = cartSlices.actions
 export default cartSlices.reducer


//  rm -rf .git
// git init
// git add .
// git commit -m "initial commit"
// git branch -M main
// git push -u origin main
// 
