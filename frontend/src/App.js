import React, { useRef } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Dictaphone from "./components/Dictaphone";
import Transcript from "./components/Transcript";

const App = () => {
	const audioPlayerRef = useRef(null);

	return (
		<div>
			<AudioPlayer ref={audioPlayerRef} />
			<Transcript audioPlayerRef={audioPlayerRef} />
			{/* <Dictaphone /> */}
		</div>
	);
};

export default App;
