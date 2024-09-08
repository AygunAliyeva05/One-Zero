import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await fetch('http://localhost:5000/data');
  const data = await response.json();
  return data; 
});

const MenuSlice = createSlice({
  name: 'menuitem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menu = action.payload; 
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default MenuSlice.reducer;
