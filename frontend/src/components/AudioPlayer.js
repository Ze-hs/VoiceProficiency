import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

import utils from "../utils/helper";
import { setAudioUrl } from "../reducers/audioReducer";
import { useDispatch, useSelector } from "react-redux";

import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

const AudioPlayer = forwardRef((_props, ref) => {
	const audioName = useSelector((state) => state.audioList.current);
	const audioUrl = useSelector((state) => state.audioList.url);

	const dispatch = useDispatch();

	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	const audioPlayer = useRef(null);

	useImperativeHandle(ref, () => {
		return audioPlayer.current;
	});

	useEffect(() => {
		dispatch(setAudioUrl());
		//Clean up url when dismounting
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

	const onProgressDrag = (event) => {
		if (isPlaying) {
			handlePlayClick();
		}
		audioPlayer.current.currentTime = event.target.value;
	};

	const onProgressDragStop = (event) => {
		if (!isPlaying) {
			handlePlayClick();
		}
	};

	//MaterialUI custom styled components
	const TinyText = styled(Typography)({
		fontSize: "0.75rem",
		opacity: 0.38,
		fontWeight: 500,
		letterSpacing: 0.2,
	});

	return (
		<Box marginBlock={2.5}>
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

			<Stack direction="row">
				<Button onClick={handlePlayClick}>
					{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
				</Button>

				<Container maxWidth={false}>
					<Slider
						value={currentTime}
						onChange={onProgressDrag}
						defaultValue={0}
						step={1}
						// style={{ width: "100%" }}
						max={duration}
					/>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mt: -1,
						}}
					>
						<TinyText>{utils.formatTime(currentTime)}</TinyText>
						<TinyText>{utils.formatTime(duration)}</TinyText>
					</Box>
				</Container>
			</Stack>
		</Box>
	);
});

export default AudioPlayer;
