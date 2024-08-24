import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState={
   questions: [],
   loading: false,
   answers: [],
};


export const quizSlice = createSlice({
    name: 'Quiz',
    initialState: {
    data: [],
    },
    reducers: {
    
    },
})

export const {} = quizSlice.actions

export default quizSlice.reducer


