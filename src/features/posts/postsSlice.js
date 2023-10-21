import { createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        postAdded: {
            reducer(state, action) {
               // immer.js is active in createSlice which prevents mutation of state in createSlice so we don't have to spread the state everytime
               state.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                    }
                }
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts

// whenever we use createSlice it creates an createActions method with the same name as our reducer method automatically and that's why we don't see the postSlice.actions in the code written explicitly
export const {postAdded, } = postsSlice.actions

export default postsSlice.reducer