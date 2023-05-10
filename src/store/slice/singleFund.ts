import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  getPorfolioTokenList,
  checkIfPortfolioPaused,
  checkIfPortfoliohasInvestment,
} from '@/helper/web3'
import { tokenRegistry } from '@/constant/token'

interface FundListState {
  fund: string
  loading: boolean
  error: string | null
}

const fetchSingleFund = createAsyncThunk('time/fetchSingleFund', async (address: string) => {
  const response = await axios.get<any>(`https://defivas.org/api/v2/portfolio/${address}`)
  const data = { ...response.data.data }

  let tokenData = await getPorfolioTokenList(address)
  tokenData = tokenData.map((address: string) => ({
    token: tokenRegistry.find((token) => token.address.toLowerCase() === address.toLowerCase())
      ?.token,
    address,
    allocation: '100',
  }))
  data.tokenList = tokenData

  const isPortfolioPaused = await checkIfPortfolioPaused(address)
  data.isPortfolioPaused = isPortfolioPaused

  const isPortfolioHasInvestment = await checkIfPortfoliohasInvestment(address)
  data.isPortfolioHasInvestment = isPortfolioHasInvestment

  return data
})

const initialState: FundListState = {
  fund: '',
  loading: false,
  error: null,
}

export const singleFundSlice = createSlice({
  name: 'singleFund',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleFund.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchSingleFund.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.fund = action.payload
    })
    builder.addCase(fetchSingleFund.rejected, (state) => {
      state.loading = false
      state.error = 'Failed to fetch funds'
    })
  },
})

export default singleFundSlice.reducer

export { fetchSingleFund }
