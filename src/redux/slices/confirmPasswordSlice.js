import { createSlice } from "@reduxjs/toolkit";

const confirmPasswordSlice=createSlice({
    name:'confirmPassword',
    initialState:{value:''},
    reducers:{
        setConfirmPassword:(state,action)=>{
            state.value=action.payload;
        }
    }
});


export default confirmPasswordSlice.reducer;
export const {setConfirmPassword}=confirmPasswordSlice.actions;