import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./reducers/audioReducer";
import transcriptReducer from "./reducers/transcriptReducer";

const store = configureStore({
	reducer: {
		audioList: audioReducer,
		transcriptList: transcriptReducer,
	},
});

export default store;
