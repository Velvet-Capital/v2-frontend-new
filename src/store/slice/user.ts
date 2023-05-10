import { formatAddress } from '@/helper/helper'
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  address: '',
  displayAddress: '',
  isConnected: false,
  chainId: '',
  walletType: '',
  balance: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountDetails: (state, action) => {
      // console.log('action', action);
      return {
        ...state,
        address: action.payload.address,
        isConnected: action.payload.isConnected,
        chainId: action.payload.chainId,
        walletType: action.payload.walletType,
        displayAddress: formatAddress(action.payload.address),
        balance: action.payload.balance,
      }
    },
    resetUser: (state) => {
      // console.log('action', action);
      return {
        ...state,
        address: '',
        isConnected: false,
        chainId: '',
        walletType: '',
        displayAddress: '',
        balance: '',
      }
    },
  },
})

export const { setAccountDetails, resetUser } = userSlice.actions
export default userSlice.reducer

// export { setAccountDetails };
