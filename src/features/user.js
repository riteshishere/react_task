import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axios'

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
    const response = await API.post(
        `/user/login`,
        { email, password },
        config
    )
    console.log("Response from server is");
    console.log(response)
    return response.data
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
            state.error = null
            state.user = null
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.error = action.payload.msg
                if (state.user !== null) state.user = null
            } else {
                state.error = null
                state.user = action.payload
            }
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
