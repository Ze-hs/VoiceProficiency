import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import sample from "../audio/Sample.mp3";

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
			>
				cannot play
			</audio>

			<div>
				<button onClick={handlePlayClick}>
					{isPlaying ? "pause" : "play"}
				</button>
				<p>{currentTime}</p>
				<input type="range"></input>
				<p>{duration}</p>
			</div>
		</>
	);
});

export default AudioPlayer;
