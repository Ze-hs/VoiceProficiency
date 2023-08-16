import { createSlice } from "@reduxjs/toolkit";
import transcriptService from "../services/transcript";
import util from "../utils/helper";
const transcriptSlice = createSlice({
	name: "transcript",
	initialState: {
		all: [],
		currentName: null,
		transcript: null,
	},
	reducers: {
		setTranscriptst(state, action) {
			return { ...state, all: action.payload };
		},

		setCurrentName(state, action) {
			return { ...state, currentName: action.payload };
		},

		setCurrentTranscript(state, action) {
			return { ...state, transcript: action.payload };
		},
	},
});

export const { setTranscriptst, setCurrentName, setCurrentTranscript } =
	transcriptSlice.actions;

export const getTranscriptList = () => {
	return async (dispatch) => {
		const audioList = await transcriptService.getAll();
		dispatch(setTranscriptst(audioList));
	};
};

export const setTranscriptName = (transcriptName) => {
	return async (dispatch, getState) => {
		if (!transcriptName) {
			return null;
		}
		const basename = util.formatFileName(transcriptName);
		const transcriptIndex = getState().transcriptList.all.findIndex(
			(name) => name.includes(basename)
		);

		if (transcriptIndex !== -1) {
			const transcript = getState().transcriptList.all[transcriptIndex];
			dispatch(setCurrentName(transcript));
		}
	};
};

export const getcurrentTranscript = () => {
	return async (dispatch, getState) => {
		const transcriptName = getState().transcriptList.currentName;
		if (!transcriptName) {
			console.log("No transcript");
			return null;
		}

		const transcript = await transcriptService.getTranscript(
			transcriptName
		);
		const transcriptFormatted = util.formatTranscript(transcript.segments);

		dispatch(setCurrentTranscript(transcriptFormatted));
	};
};

export default transcriptSlice.reducer;
