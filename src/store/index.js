import { configureStore } from "@reduxjs/toolkit";
import productSlice from './dataReducer'

const store = configureStore({
    reducer: {
        products: productSlice
    }
})

export default store;