import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../utils/api";

export const fetchData = createAsyncThunk(
    'products/fetchData', async () => {
        const res = await apiClient.get('/api/product');
        return res.data
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },  
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.products = action.payload
        } )
    }
})

export default productSlice.reducer