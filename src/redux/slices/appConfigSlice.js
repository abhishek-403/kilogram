import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';



export const getMyInfo = createAsyncThunk('/user/getmyinfo', async (_,thunkAPI) => {
    try {
        
        thunkAPI.dispatch(setSpinner(true));


        const response = await axiosClient.get('/user/getmyprofile')

        return response.result;


    } catch (e) {
        return Promise.reject(e)

    } finally{
        thunkAPI.dispatch(setSpinner(false));
    }
})



export const updateProfile = createAsyncThunk('/user/updateProfile', async (body) => {

    try {
       
        const response = await axiosClient.put('/user/',body)

     
        return response.result;
        
    } catch (e) {
        return Promise.reject(e);
        
    }


})













const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: {
        isLoading: false,
        myProfile: {},
        myPosts:[],
        myFeeds:[],
        toastData:{},
        isSpinning:false


    },
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setSpinner: (state, action) => {
            state.isSpinning = action.payload;
        },
        setCreatingPost: (state, action) => {
            state.creatingPost = action.payload;
        },
        setSearching: (state, action) => {
            state.isSearching = action.payload;
        },
        showToast:(state,action)=>{
            state.toastData= action.payload
        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.myProfile = action.payload.user;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.myProfile = action.payload.user;
            })
            // .addCase(getMyPostsThunk.fulfilled, (state, action) => {
            //     state.myPosts = action.payload.allPosts;
            // })
            // .addCase(getMyFeedsThunk.fulfilled, (state, action) => {
            //     state.myFeeds = action.payload;
            // })
    }
})

export default appConfigSlice.reducer;
export const { setSpinner,setSearching,setLoader,showToast,setCreatingPost } = appConfigSlice.actions;