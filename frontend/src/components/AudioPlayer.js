import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import utils from "../utils/helper";

import audioService from "../services/audio";

//Possibly delete this
import "./text.css";

const AudioPlayer = forwardRef(({ audioName }, ref) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [audioUrl, setAudioUrl] = useState(null);
	const audioPlayer = useRef(null);

	useImperativeHandle(ref, () => audioPlayer.current);

	useEffect(() => {
		if (audioName) {
			audioService
				.getAudio(audioName)
				.then((data) => {
					const blob = new Blob([data], { type: "audio/ogg" });
					const url = URL.createObjectURL(blob);
					setAudioUrl(url);
				})
				.catch((error) => {
					console.log("error fetching url", error);
				});
		}

		//Clean up the blob url when dismounting
		return () => {
			if (audioUrl) {
				URL.revokeObjectURL(audioUrl);
			}
		};
	}, [audioName]);

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

	if (!audioUrl) {
		return <div>No audio found</div>;
	}

	return (
		<>
			<div>audioPlayer</div>
			<audio
				ref={audioPlayer}
				onTimeUpdate={updateCurrentTime}
				src={audioUrl}
				type="audio/ogg"
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
					style={{ width: "100%" }}
				></input>
				<p>{utils.formatTime(duration)}</p>
			</div>
		</>
	);
});

export default AudioPlayer;
