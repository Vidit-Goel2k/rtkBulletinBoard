import { createAsyncThunk, createSelector, createSlice, nanoid } from "@reduxjs/toolkit"
import axios from "axios"
import { sub } from "date-fns"
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: 'idle', // 'idle | 'loading' | 'succeeded' | 'failed'
    error: null,
    count:0,
}

// createAsyncThunk is a utility provided by Redux Toolkit to simplify the process of creating asynchronous actions, such as fetching data from an API.
// The first argument to createAsyncThunk is a string that represents the name of the action. 
// The second argument is an asynchronous function that contains the logic for fetching data. 
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    try {
        const {id} = initialPost
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (error) {
        // return error
        return initialPost // only for testing redux
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        // as the our jsonPlaceholder api does not return id of the post deleted we return the initial post to extract the id in the builder.addCase
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        // postAdded: {
        //     reducer(state, action) {
        //        // immer.js is active in createSlice which prevents mutation of state in createSlice so we don't have to spread the state everytime
        //        state.posts.push(action.payload)
        //     },
        //     // used to abstract the structure of our posts state,
        //     // so that each component does'nt need to provide the exact structure and can just pass the arguments which are required as a method
        //     prepare(title, content, userId){
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 date: new Date().toISOString(),
        //                 userId,
        //                 reactions: {
        //                     thumbsUp: 0,
        //                     wow: 0,
        //                     heart: 0,
        //                     rocket: 0,
        //                     coffee: 0
        //                 },
        //             }
        //         }
        //     }
        // },

        reactionAdded (state, action)  {
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post=> post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },

        increaseCount(state, action){
            state.count = state.count + 1 
        },
    },
    // extraReducers section is handling the different states of the fetchPosts action effectively. It updates the state based on whether the action is pending, fulfilled, or rejected, and it adds timestamps and initial reactions to the posts when the data is successfully fetched. Additionally, it captures and displays the error message if there is an issue with the API request.
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // adding date and reactions
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++ }).toISOString(),
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart:0,
                        rocket: 0,
                        coffee:0,
                    }
                    return post
                })
                // add any fetched posts to the array
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.payload.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                state.status = 'succeeded'
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart:0,
                    rocket: 0,
                    coffee:0,
                }
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return
                }
                const {id} = action.payload
                action.payload.date = new Date().toISOString()
                const posts = state.posts.filter(post => post.id !== id)
                // typeof(action.payload) === 'object' that's why below statement will produce error in selectPostById method when find is called on an object
                // state.posts = action.payload
                // to correct this error we have to spread the state and add the action.payload to it in an array as done below
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return
                }
                const {id} = action.payload
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = posts
            })
    }
})

// used to abstract the selection of all posts from each component to the postSlice,
// usefull in cases where we change the structure of posts in later refactoring of code.  
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const getCount = (state) => state.posts.count

export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => post.id === postId)
}

export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post=> post.userId === userId)
)

// whenever we use createSlice it creates an createActions method with the same name as our reducer method automatically and that's why we don't see the postSlice.actions in the code written explicitly
export const {increaseCount, reactionAdded} = postsSlice.actions

export default postsSlice.reducer