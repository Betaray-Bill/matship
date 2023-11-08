import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    basematerialInfo:null,
    testStandard:null
}

const uploadSlice = createSlice({
    name:"upload",
    initialState,
    reducers:{
        uploadbaseInfo: (state, action) => {
            state.basematerialInfo = action.payload
        },
        testStandardInfo: (state, action) => {
            state.testStandard = action.payload
        }
    }
})

export const {
    uploadbaseInfo,
    testStandardInfo
} = uploadSlice.actions

export default uploadSlice.reducer

