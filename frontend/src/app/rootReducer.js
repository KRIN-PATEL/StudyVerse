import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import{ courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { quizApi } from "@/features/api/quizApi";
import { contactApi } from "@/features/api/contactApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, 
    [courseApi.reducerPath]: courseApi.reducer, 
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [contactApi.reducerPath]:contactApi.reducer,
    auth: authReducer, 
  });
  
  export default rootReducer;