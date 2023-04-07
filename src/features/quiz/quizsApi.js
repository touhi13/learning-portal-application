/* eslint-disable no-undef */
import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizData: builder.query({
            query: (id)=>`/quizzes?video_id=${id}`
        })
    })
});

export const { useGetQuizDataQuery } = quizApi