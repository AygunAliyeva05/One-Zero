import { configureStore } from "@reduxjs/toolkit";
 import MenuReducer from "./MenuSlice";

 export const store=configureStore({
    reducer:{
       menuitem:MenuReducer
    }
})