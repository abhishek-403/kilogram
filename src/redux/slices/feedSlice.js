import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient';

import { likePost } from './postSlice';



export const getFeedData = createAsyncThunk('post/getUserprofile', async (_, thunkapi) => {

    try {

        const response = await axiosClient.get('/user/getfeeddata');
        // console.log("slice feed",response);

        // console.log(response);
        return response.result;

    } catch (e) {
        return Promise.reject(e);

    }



})


export const getAllUsers = createAsyncThunk('user/getAllusers', async (_, thunkapi) => {

    try {

        const response = await axiosClient.get('/user/getallusers');
        // console.log("slice feed",response);

        // console.log(response.result.allUsers);
        return response.result.allUsers;

    } catch (e) {
        return Promise.reject(e);

    }



})


export const followController = createAsyncThunk('/user/follow', async (body) => {
    try {


        const response = await axiosClient.post('/user/follow', body);
        // console.log("slice followcontroller",response);
        return response.result.user;


    } catch (e) {
        return Promise.reject(e);

    }

})




const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {

        feedData: {},
        allUsersData: []

    },

    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.feedData = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsersData = action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state.feedData.posts.findIndex(item => item._id === post._id)
                if (index !== -1) {
                    state.feedData.posts[index] = post;

                }

            })
            .addCase(followController.fulfilled, (state, action) => {
                const user = action.payload;
                const index = state.feedData?.followings?.findIndex(item => item._id === user._id);

                if (index !== -1) {

                    state.feedData?.followings?.splice(index, 1)

                } else {

                    state.feedData?.followings?.push(user);

                }

            })

    }
})

export default feedSlice.reducer;