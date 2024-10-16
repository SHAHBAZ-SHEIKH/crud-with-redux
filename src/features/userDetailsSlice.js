import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";


export const createUser = createAsyncThunk("createuser",async (data,{rejectWithValue})=>{
    const response = await fetch("https://670e17c0073307b4ee456cbc.mockapi.io/crud",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    try{
        const result = await response.json()
        return result
    }
    catch(error){
        console.log(error)
        return rejectWithValue(error.message)
    }
})


export const showUser = createAsyncThunk("showuser",async (_, { rejectWithValue })=>{
    const response = await fetch("https://670e17c0073307b4ee456cbc.mockapi.io/crud")
    try{
        const result = await response.json()
        
        return result
    }
    catch(error){
        console.log("error",error)
        return rejectWithValue(error.message)
    }
    
})

export const deleteUser = createAsyncThunk("deleteuser",async (id,{rejectWithValue})=>{
    const response = await fetch(`https://670e17c0073307b4ee456cbc.mockapi.io/crud/${id}`,{
        method: "DELETE"
    })
    try{
        const result = await response.json()
        return result
    }
    catch(error){
        console.log(error)
        return rejectWithValue(error.message)
    }
})


export const updateUser = createAsyncThunk("updateuser",async (data,{rejectWithValue})=>{
    const response = await fetch(`https://670e17c0073307b4ee456cbc.mockapi.io/crud/${data.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    try{
        const result = await response.json()
        return result
    }
    catch(error){
        console.log(error)
        return rejectWithValue(error.message)
    }
})


export const userDetails = createSlice({
    name: "userDetails",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData:"",
    },

    reducers:{
        userSearch:(state,action)=>{
            state.searchData = action.payload
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(createUser.pending, (state)=>{
            state.loading = true
        }).addCase(createUser.fulfilled, (state,action)=>{
            state.loading = false
            state.error = null
            state.users.push(action.payload)
        }).addCase(createUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        }),

        builder.addCase(showUser.pending, (state)=>{
            state.loading = true

        }).addCase(showUser.fulfilled, (state,action)=>{
            state.loading = false
            state.error = null
            state.users= action.payload

        }).addCase(showUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        }),

        builder.addCase(deleteUser.pending, (state)=>{
            state.loading = true

        }).addCase(deleteUser.fulfilled, (state,action)=>{
            state.loading = false
            state.error = null
            state.users = state.users.filter((item)=> item.id !== action.payload.id)

        }).addCase(deleteUser.rejected, (state,action)=>{
            state.loading = false   
            state.error = action.payload
        }),

        builder.addCase(updateUser.pending, (state)=>{
            state.loading = true
        }).addCase(updateUser.fulfilled, (state,action)=>{
            state.loading = false
            state.error = null
            state.users = state.users.map((item)=>{
                if(item.id === action.payload.id){
                    return action.payload
                }
                return item
            })
        }).addCase(updateUser.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
    
})

export default userDetails.reducer

export const {userSearch} = userDetails.actions