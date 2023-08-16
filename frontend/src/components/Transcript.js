import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

//Material UI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Transcript = ({ audioPlayerRef }) => {
	const transcript = useSelector((state) => state.transcriptList.transcript);
	const audioName = useSelector((state) => state.audioList.current);
	const transcriptName = useSelector(
		(state) => state.transcriptList.currentName
	);
	const wordsRef = useRef(null);

	const [highlightPos, setHighlightPos] = useState(null);
	const [showConfidence, setShowConfidence] = useState(false);

	//Highlight current words in the transcript
	useEffect(() => {
		const playerCur = audioPlayerRef.current;
		//Find the current active word and set the css property
		const ontimeupdate = () => {
			const activeWordIndex = transcript.findIndex((word) => {
				return word.start >= audioPlayerRef.current.currentTime;
			});

			if (activeWordIndex !== -1) {
				const activeWord = wordsRef.current.childNodes[activeWordIndex];
				setHighlightPos(
					getWordProperty(
						wordsRef.current.getBoundingClientRect(),
						activeWord.getBoundingClientRect()
					)
				);
			}
		};

		if (audioPlayerRef && audioPlayerRef.current) {
			playerCur.addEventListener("timeupdate", ontimeupdate);
		}

		//Clean up function for timeupdate
		if (playerCur) {
			return () => {
				playerCur.removeEventListener("timeupdate", ontimeupdate);
			};
		}
	}, [audioPlayerRef, transcript, transcriptName]);

	const getWordProperty = (parent, child) => {
		return {
			width: child.width,
			height: child.height,
			top: child.top - parent.top,
			left: child.left - parent.left,
		};
	};

	const onWordClick = (word) => {
		audioPlayerRef.current.currentTime = word.start;
	};

	const onConfidenceBtnClick = () => {
		setShowConfidence(!showConfidence);
	};

	if (!Array.isArray(transcript) || !transcript.length) {
		return <Typography>No transcript found</Typography>;
	} else if (audioName && !transcriptName) {
		return <Typography>Transcript not processed yet</Typography>;
	}

	return (
		<Box
			sx={{
				marginBlock: "1.25%",
			}}
		>
			<Button
				sx={{ fontSize: ".85em" }}
				variant="outlined"
				onClick={onConfidenceBtnClick}
			>
				Show Confidence
			</Button>
			<Box
				sx={{
					position: "relative",
					marginTop: "1.25%",

					wordSpacing: ".25em",
				}}
				ref={wordsRef}
			>
				{transcript.map((words) => (
					<Typography
						key={`${words.word}-${words.start}`}
						onClick={() => onWordClick(words)}
						sx={{
							display: "inline",
							position: "relative",
							padding: 0,
							margin: 0,
							fontSize: "1.05em",
							zIndex: 2,
							backgroundColor:
								showConfidence && words.probability < 0.25
									? "error.light"
									: null,
						}}
					>
						{words.word}
					</Typography>
				))}

				<Box
					sx={{
						...highlightPos,
						position: "absolute",
						opacity: "35%",
						backgroundColor: "primary.main",
						zIndex: 1,
					}}
				></Box>
			</Box>
		</Box>
	);
};

export default Transcript;
