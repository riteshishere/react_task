import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const { data } = await axios.post(
        `www.google.com/fakeAPI`,
        { email, password },
        config
    )
    return data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state, action) {
            state = initialState
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.user = null
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.loading = false
        },
        [loginUser.rejected]: (state, action) => {
            const error = action.payload
            state.error = error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            state.loading = false
        }
    }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
