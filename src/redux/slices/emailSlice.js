import { createSlice } from "@reduxjs/toolkit";

const emailSlice=createSlice({
    name:'email',
    initialState:{value:''},
    reducers:{
        setEmail:(state,action)=>{
            state.value=action.payload;
        }
    }
});


export default emailSlice.reducer;
export const {setEmail}=emailSlice.actions;