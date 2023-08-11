import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import sample from "../../../backend/public/audio/sample.mp3";
import utils from "../utils/helper";

import "./text.css";

const AudioPlayer = forwardRef((props, ref) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const audioPlayer = useRef(null);

	useImperativeHandle(ref, () => audioPlayer.current);

	const handlePlayClick = () => {
		setIsPlaying(!isPlaying);
		isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
	};

	const onLoadedMetadata = () => {
		const seconds = Math.floor(audioPlayer.current.duration);
		setDuration(seconds);
	};

	const updateCurrentTime = (event) => {
		setCurrentTime(event.currentTarget.currentTime);
	};

	const onProgressBarChange = (event) => {
		audioPlayer.current.currentTime = event.target.value;
	};
	return (
		<>
			<div>audioPlayer</div>
			<audio
				ref={audioPlayer}
				onTimeUpdate={updateCurrentTime}
				src={sample}
				type="audio/mpeg"
				//Wait for metadata before setting duration
				preload="metadata"
				onLoadedMetadata={onLoadedMetadata}
				onEnded={handlePlayClick}
			>
				cannot play
			</audio>

			<div>
				<button onClick={handlePlayClick}>
					{isPlaying ? "pause" : "play"}
				</button>
				<p>{utils.formatTime(currentTime)}</p>
				<input
					type="range"
					className="audio-progress"
					value={currentTime}
					onInput={onProgressBarChange}
					max={duration}
					min={0}
					style={{ width: "100%" }}
				></input>
				<p>{utils.formatTime(duration)}</p>
			</div>
		</>
	);
});

export default AudioPlayer;
