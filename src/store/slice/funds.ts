import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface FundListState {
  fundList: string
  loading: boolean
  error: string | null
}

const fetchFundList = createAsyncThunk('time/fetchFundList', async (address: string) => {
  const response = await axios.get<any>(`https://defivas.org/api/v2/portfolio/user/${address}`)

  return response.data.data
})

const initialState: FundListState = {
  fundList: '',
  loading: false,
  error: null,
}

export const fundsSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFundList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchFundList.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.fundList = action.payload
    })
    builder.addCase(fetchFundList.rejected, (state) => {
      state.loading = false
      state.error = 'Failed to fetch funds'
    })
  },
})

export default fundsSlice.reducer

export { fetchFundList }
