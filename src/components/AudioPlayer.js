import React, { useEffect, useRef, useState } from "react";
import test from "../audio/test.mp3";

const AudioPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [current, setCurrent] = useState(0);
	const audioPlayer = useRef(null);

	useEffect(() => {
		if (audioPlayer.current.duration) {
			setDuration(audioPlayer.current.duration);
		}
	}, []);

	const handlePlayClick = () => {
		setIsPlaying(!isPlaying);
		isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
	};

	return (
		<>
			<div>audioPlayer</div>
			<audio
				ref={audioPlayer}
				onTimeUpdate={(e) => console.log(e.currentTarget.currentTime)}
				src={test}
				type="audio/mpeg"
			>
				cannot play
			</audio>

			<div>
				<button onClick={handlePlayClick}>
					{isPlaying ? "pause" : "play"}
				</button>
				<p>current time:</p>
				<input type="range"></input>
				<p>{duration}</p>
			</div>
		</>
	);
};

export default AudioPlayer;
