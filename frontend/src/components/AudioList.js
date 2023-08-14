import React from "react";

const AudioList = ({ audioList, setAudio }) => {
	const handleClick = (audio) => {
		const audioName = audio;
		setAudio(audioName);
	};

	return (
		<ul>
			{audioList.map((audio) => (
				<li key={audio} onClick={() => handleClick(audio)}>
					{audio}
				</li>
			))}
		</ul>
	);
};

export default AudioList;
