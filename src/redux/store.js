import { configureStore } from "@reduxjs/toolkit";
import nameSlice from './slices/nameSlice'
import emailSlice from './slices/emailSlice'
import passwordSlice from './slices/passwordSlice'
import confirmPasswordSlice from './slices/confirmPasswordSlice'

const store=configureStore({
    reducer:{
        name:nameSlice,
        email:emailSlice,
        password:passwordSlice,
        confirmPassword:confirmPasswordSlice,
    }
});

export {store};