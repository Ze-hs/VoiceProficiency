import React, { useEffect, useRef } from "react";
import AudioList from "./components/AudioList";
import AudioPlayer from "./components/AudioPlayer";
import Transcript from "./components/Transcript";
import DropZone from "./components/DropZone";
import { getAudioList } from "./reducers/audioReducer";
import { useDispatch } from "react-redux";
import { getTranscriptList } from "./reducers/transcriptReducer";

//MaterialUI imports
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const App = () => {
	const audioPlayerRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAudioList());
		dispatch(getTranscriptList());
	}, [dispatch]);

	return (
		<Stack direction="row">
			<AudioList />

			<Box sx={{ width: "100%" }} margin={1}>
				<AudioPlayer ref={audioPlayerRef} />

				<Divider />
				<Transcript audioPlayerRef={audioPlayerRef} />

				<Divider />
				<DropZone />
			</Box>
		</Stack>
	);
};

export default App;
