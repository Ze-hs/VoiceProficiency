import React, { useEffect, useRef, useState } from "react";
import audioService from "./services/audio";
import AudioList from "./components/AudioList";
import AudioPlayer from "./components/AudioPlayer";
import Transcript from "./components/Transcript";
import util from "./utils/helper";
import DropZone from "./components/DropZone";

const App = () => {
	const [audioList, setAudioList] = useState([]);
	const [audioName, setAudioName] = useState(null);
	const audioPlayerRef = useRef(null);

	const getTranscriptName = () => {
		return audioName ? `${util.formatFileName(audioName)}.json` : null;
	};

	useEffect(() => {
		audioService.getAll().then((data) => {
			setAudioList(data);
		});
	}, []);

	return (
		<div>
			<AudioPlayer ref={audioPlayerRef} audioName={audioName} />
			<Transcript
				audioPlayerRef={audioPlayerRef}
				transcriptName={getTranscriptName()}
			/>
			<AudioList audioList={audioList} setAudio={setAudioName} />
			<DropZone />
		</div>
	);
};

export default App;
