import { createSlice } from '@reduxjs/toolkit'

export interface MenuState {
  value: string
}

const initialState: MenuState = {
  value: 'Dashboard',
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMenu } = menuSlice.actions

export default menuSlice.reducer
