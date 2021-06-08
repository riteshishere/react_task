import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../service/axios'
import isAuthenticUser from '../utilities/isAuthenticUser'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const registerUser = createAsyncThunk('user/register', async ({ name, email, password, phone, history }) => {
    const response = await API.post(
        `/user/register`,
        { name, email, password, phone },
    )
    console.log("Response from server is");
    console.log(response)
    if (response.data.success) {
        const token = response.data.token
        document.cookie = `token=${token};`
        history.push("/")
    }
    return response.data
})

export const loginUser = createAsyncThunk('user/login', async ({ email, password, history }) => {
    const response = await API.post(
        `/user/login`,
        { email, password },
    )
    console.log("Response from server is");
    console.log(response)
    if (response.data.success) {
        const token = response.data.token
        document.cookie = `token=${token};`
        history.push("/")
    }
    const data = response.data
    return data
})

export const getUserDetail = createAsyncThunk('user/data', async () => {
    const response = await API.get(
        `/user`,
    )
    console.log("Got details of user", response)
    return response.data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state, { payload: { history } }) {
            document.cookie = "token=;"
            history.push("/auth/login")
            return {
                ...initialState
            }
        }
    },
    extraReducers: {
        [loginUser.pending]: () => {
            return {
                ...initialState,
                loading: true,
                error: null,
            }
        },
        [loginUser.fulfilled]: (state, action) => {
            console.log("Fulfilling request", action.payload)
            if (!action.payload.success) {
                return {
                    ...state,
                    user: null,
                    loading: false,
                    error: action.payload.msg,
                }
            } else {
                return {
                    ...state,
                    user: action.payload.user,
                    error: null,
                    loading: false,
                }
            }
        },
        [loginUser.rejected]: (state, action) => {
            console.log("Action after login rejection is", action)
            const error = action.payload
            return {
                ...initialState,
                loading: false,
                error:
                    error
                        ? error.response
                            ? error.response.data.message
                                ? error.response.data.message
                                : error.message
                            : error.request
                                ? error.request.data.message
                                    ? error.request.data.message
                                    : error.message
                                : "Unknown error has been occured..."
                        : action.error.message
            }
        },
        [registerUser.pending]: () => {
            return {
                ...initialState,
                loading: true,
                error: null,
            }
        },
        [registerUser.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                return {
                    ...state,
                    user: null,
                    loading: false,
                    error: action.payload.msg,
                }
            } else {
                return {
                    ...state,
                    user: action.payload.user,
                    error: null,
                    loading: false,
                }
            }
        },
        [registerUser.rejected]: (state, action) => {
            const error = action.payload
            return {
                ...initialState,
                loading: false,
                error:
                    error
                        ? error.response
                            ? error.response.data.message
                                ? error.response.data.message
                                : error.message
                            : error.request
                                ? error.request.data.message
                                    ? error.request.data.message
                                    : error.message
                                : "Unknown error has been occured..."
                        : action.error.message
            }
        },
        [getUserDetail.pending]: () => {
            return {
                ...initialState,
                error: null,
                loading: true,
            }
        },
        [getUserDetail.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                return {
                    ...state,
                    user: null,
                    loading: false,
                    error: action.payload.msg,
                }
            } else {
                return {
                    ...state,
                    user: action.payload.user,
                    error: null,
                    loading: false,
                }
            }
        },
        [getUserDetail.rejected]: (state, action) => {
            console.log("action after rejection is", action)
            const error = action.payload
            return {
                ...initialState,
                loading: false,
                error:
                    error
                        ? error.response
                            ? error.response.data.message
                                ? error.response.data.message
                                : error.message
                            : error.request
                                ? error.request.data.message
                                    ? error.request.data.message
                                    : error.message
                                : "Unknown error has been occured..."
                        : action.error.message
            }
        },
    }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
