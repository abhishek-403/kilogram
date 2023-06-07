import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';



export const getUserProfile = createAsyncThunk('post/getUserprofile', async (body) => {

    try {
        
        const response = await axiosClient.post('/user/getusersprofile',body);
        // console.log("userprofile",response);

        // console.log(response);
        return response.result;
        
    } catch (e) {
        return Promise.reject(e);
        
    }



})


export const likePost= createAsyncThunk('post/like',async(body)=>{

    try {
       
        const response = await axiosClient.post('/post/like',body);
        

        return response.result.post;
        
    } catch (e) {
        return Promise.reject(e);
        
    }
    
})





const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        
        userProfile: {}
        
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(likePost.fulfilled,(state,action)=>{
                const post = action.payload;
                const index = state.userProfile.posts.findIndex(item=>item._id===post._id)

                // index&&index!=-1
                if(index!==-1){
                    state.userProfile.posts[index]= post;

                }

            })
            
            
    }
})

export default postSlice.reducer;