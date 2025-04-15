import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; 
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { quizApi } from "@/features/api/quizApi";
import { contactApi } from "@/features/api/contactApi";
import { certificateApi } from "@/features/api/certificateApi";
export const appStore = configureStore({
    reducer: rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware,courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware, quizApi.middleware, contactApi.middleware, certificateApi.middleware  ),
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();