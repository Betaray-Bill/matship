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
        }
    }
})

export const {
    uploadbaseInfo
} = uploadSlice.actions

export default uploadSlice.reducer

