import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'




export interface ShippingAddress {
    location?: string
    city?: string
    state?: string
    zip_code?: string
    country?: string
}
export interface PaymentMethod {
    name:string
    description:string
    image:string
}

export interface CheckoutState {
   shippingAddress:ShippingAddress
   paymentMethod:PaymentMethod

   }


const initialState: CheckoutState = {
    shippingAddress: {
        location: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
    },
    paymentMethod:{
        name:"",
        description:"",
        image:""
    }
}


if (typeof window !== 'undefined') {
    const localStorage = window.localStorage
    const address = localStorage.getItem('shippingAddress')
    if (address) {
        initialState.shippingAddress = JSON.parse(address)
    }
    const payment = localStorage.getItem('paymentMethod')
    if (payment) {
        initialState.paymentMethod = JSON.parse(payment)
    }

}


const checkoutSlices = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        createAdresse: (state, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
        },
        createPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
            state.paymentMethod = action.payload
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
        },
      
    },

})

export const { createAdresse, createPaymentMethod } = checkoutSlices.actions
export default checkoutSlices.reducer