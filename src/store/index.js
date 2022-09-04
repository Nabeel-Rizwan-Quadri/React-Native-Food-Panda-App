import { configureStore } from '@reduxjs/toolkit'
// import { getDefaultMiddlewar } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/dist/query'
// import { userApi } from '../services/user'

import reducer from './rootReducer'

export const store = configureStore({
  reducer: reducer,
//   middleware: (getDefaultMiddleware)=>
//     getDefaultMiddleware().concat(userApi.middleware)
}
)