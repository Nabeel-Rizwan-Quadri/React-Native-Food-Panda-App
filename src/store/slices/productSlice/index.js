import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: "",
  cartTotal: ""
}

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async () => {
    // const response = await axios.get('http://localhost:5000/get-all-products')
    // return response.data
  }
)

export const fetchProductDetails = createAsyncThunk(
  'fetchProductDetails',
  async (_id) => {
    // const response = await axios.post('http://localhost:5000/get-single-product', { _id })
    // return response.data
  }
)

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    createProduct: (state, action) => {
      // let data
      // data = action.payload

      // // state.fromData = data
      // axios.post("http://localhost:5000/create-product", { data })
      //   .then(res => (res))
      //   .catch(error => (error))
    },
    deleteProduct: (state, action) => {

    },

    addToCart: (state, action) => {
      // console.log("add to cart", action.payload)
      state.cart = [...state.cart, action.payload]
    },

    removeFromCart: (state, action) => {
      state.cart = action.payload
    },
    updateCart: (state, action) => {
      console.log(action.payload)
      state.cart = action.payload
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload

    },
    clearEntireCart: (state, action) => {
      state.cart = ""
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchProducts.fulfilled, (state, action) => {
  //     state.products = action.payload
  //   })
  //   builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
  //     state.productDetails = action.payload
  //   })
  // },
})

// Action creators are generated for each case reducer function
export const { createProduct, deleteProduct, addToCart,
  removeFromCart, clearEntireCart, updateCart, setCartTotal } = productSlice.actions

export default productSlice.reducer
