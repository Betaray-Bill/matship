import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFormFilledState:false
};

const formFilledSlice = createSlice({
  name: 'formfilled',
  initialState,
  reducers: {
    isFormFilledTrue: (state) => {
      state.isFormFilledState = true
    },
    isFormFilledFalse :(state) => {
        state.isFormFilledState = false
    }
  },
});

export const {
  isFormFilledTrue,
  isFormFilledFalse
} = formFilledSlice.actions;

export default formFilledSlice.reducer;