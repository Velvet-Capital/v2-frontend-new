import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// ...
import menuReducer from './slice/menu'
import modalReducer from './slice/modal'
import userReducer from './slice/user'
import fundReducer from './slice/funds'
import singleFundReducer from './slice/singleFund'

const rootReducer = combineReducers({
  menu: menuReducer,
  modals: modalReducer,
  user: userReducer,
  funds: fundReducer,
  singleFund: singleFundReducer,
})

const persistConfig = {
  timeout: 1000,
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
