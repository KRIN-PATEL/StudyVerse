import { apiSlice } from "./apiSlice";

//quiz api
export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => "/quiz",
      providesTags: ["Quizzes"],
    }),
    getQuizById: builder.query({
      query: (quizId) => `/quiz/${quizId}`,
      providesTags: ["Quiz"],
    }),
    getQuizByCourse: builder.query({
      query: (courseId) => `/quiz/course/${courseId}`,
      providesTags: ["Quiz"],
    }),
    createQuiz: builder.mutation({
      query: (quizData) => ({
        url: "/quiz/create",
        method: "POST",
        body: quizData,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    updateQuiz: builder.mutation({
      query: ({ quizId, updatedQuiz }) => ({
        url: `/quiz/${quizId}`,
        method: "PUT",
        body: updatedQuiz,
      }),
      invalidatesTags: ["Quiz", "Quizzes"],
    }),
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quiz/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
    submitQuiz: builder.mutation({
      query: ({ quizId, answers }) => ({
        url: `/quiz/submit/${quizId}`,
        method: "POST",
        body: { answers },
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
  useGetQuizByCourseQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useSubmitQuizMutation,
} = quizApi;
