import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    order: "",
    shippingDetails: {},
    paymentDetails: {},
    billAmount: "",
    cartTotal: "",
    allOrders: [],
    createOrderResponse: ""
}

export const fetchOrders = createAsyncThunk(
    'fetchOrders',
    async () => {
        // const response = await axios.get('http://localhost:5000/get-all-orders')
        // return response.data
    }
)

export const createOrder = createAsyncThunk(
    'createOrder',
    async (data) => {
        console.log("order slice data", data)

        // const response = await axios.post('http://localhost:5000/create-order', data)
        // return response.data
    }
)

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            // console.log(action.payload)
            state.cartItems = action.payload
        },
        setCartTotal: (state, action) => {
            // console.log(action.payload)
            state.cartTotal = action.payload
        },
        setDeliveryInfo: (state, action) => {
            // console.log(action.payload)
            state.deliveryInfo = action.payload
        },
        setPaymentDetails: (state, action) => {
            // console.log(action.payload)
            state.paymentDetails = action.payload
        },
        setBillAmount: (state, action) => {
            // console.log(action.payload)
            state.billAmount = action.payload
        },
        deleteOrderState: (state) => {
            state.shippingDetails = {}
            state.paymentDetails = {}
            state.order = ""
            state.billAmount = ""
            state.cartTotal = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.allOrders = action.payload
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.createOrderResponse = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { setCartItems, setCartTotal, setDeliveryInfo, setShippingDetails,
    setPaymentDetails, setBillAmount, deleteOrderState } = orderSlice.actions

export default orderSlice.reducer
