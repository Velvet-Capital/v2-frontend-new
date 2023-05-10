/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

interface ModalProps {
  isConnectWalletModalVisible: boolean
}

export const initialState: ModalProps = {
  isConnectWalletModalVisible: false,
}

export const modalSlice = createSlice({
  name: 'modals',
  initialState,

  reducers: {
    toggleConnectWallet: (state) => {
      state.isConnectWalletModalVisible = !state.isConnectWalletModalVisible
    },
  },
})

export const { toggleConnectWallet } = modalSlice.actions

export default modalSlice.reducer
