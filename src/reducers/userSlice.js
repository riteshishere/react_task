import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../service/axios'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const registerUser = createAsyncThunk('user/register', async ({ name, email, password, phone }) => {
    const response = await API.post(
        `/user/register`,
        { name, email, password, phone },
    )
    console.log("Response from server is");
    console.log(response)
    return response.data
})

export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
    const response = await API.post(
        `/user/login`,
        { email, password },
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
        },
        [registerUser.pending]: (state, action) => {
            state.error = null
            state.user = null
            state.loading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.error = action.payload.msg
                if (state.user !== null) state.user = null
            } else {
                state.error = null
                state.user = action.payload
            }
            state.loading = false
        },
        [registerUser.rejected]: (state, action) => {
            const error = action.payload
            state.error = 
                error.response
                    ? error.response.data.message
                        ? error.response.data.message
                        : error.message
                    :error.request
                        ? error.request.data.message
                            ? error.request.message
                            : error.message
                        : "Unknown error has been occured..."
            state.loading = false
        }
    }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
