import { createSlice } from "@reduxjs/toolkit";

const passwordSlice=createSlice({
    name:'password',
    initialState:{value:''},
    reducers:{
        setPassword:(state,action)=>{
            state.value=action.payload;
        }
    }
});


export default passwordSlice.reducer;
export const {setPassword}=passwordSlice.actions;