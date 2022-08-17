import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basketSlice'
import drugstoreReducer from './slices/drugstoreSlice'
import userReducer from './slices/userSlice'
import pacientsReducer from './slices/pacientsSlice'
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    drugstore: drugstoreReducer,
    user: userReducer,
    pacients: pacientsReducer
  },
})