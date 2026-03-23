import { configureStore } from "@reduxjs/toolkit";
import emailSlice from './slices/emailSlice'
import passwordSlice from './slices/passwordSlice'


const store=configureStore({
    reducer:{
        email:emailSlice,
        password:passwordSlice,
    }
});

export {store};