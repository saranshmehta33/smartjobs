import { combineReducers } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension'; // Correct import
import { configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { usersReducer } from "./reducers/usersReducer";


const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer : loaderReducer,
  usersReducer : usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  // enhancers: [composeWithDevTools()],
});

export default store;
