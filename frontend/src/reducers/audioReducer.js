import { createSlice } from "@reduxjs/toolkit";
import audioService from "../services/audioList";

const audioSlice = createSlice({
	name: "audio",
	initialState: {
		all: [],
		current: null,
		url: null,
	},
	reducers: {
		setAudioList(state, action) {
			return { ...state, all: action.payload };
		},

		setAudio(state, action) {
			return { ...state, current: action.payload };
		},

		setUrl(state, action) {
			return { ...state, url: action.payload };
		},
	},
});

export const { setAudioList, setAudio, setUrl } = audioSlice.actions;

export const getAudioList = () => {
	return async (dispatch) => {
		const audioList = await audioService.getAll();
		dispatch(setAudioList(audioList));
	};
};

export const setCurrentAudio = (audioName) => {
	return async (dispatch, getState) => {
		dispatch(setAudio(audioName));
	};
};

export const setAudioUrl = () => {
	return async (dispatch, getState) => {
		const audioName = getState().audioList.current;
		if (!audioName) {
			return null;
		}
		const audio = await audioService.getAudio(audioName);
		const blob = new Blob([audio], { type: "audio/ogg" });
		const url = URL.createObjectURL(blob);
		dispatch(setUrl(url));
	};
};

export default audioSlice.reducer;
