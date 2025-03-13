<<<<<<< HEAD
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import{ courseApi } from "@/features/api/courseApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, 
    [courseApi.reducerPath]: courseApi.reducer, 
    auth: authReducer, 
  });
  
=======
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import{ courseApi } from "@/features/api/courseApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer, 
    [courseApi.reducerPath]: courseApi.reducer, 
    auth: authReducer, 
  });
  
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
  export default rootReducer;