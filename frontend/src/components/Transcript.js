import React, { useEffect, useRef, useState } from "react";
import utils from "../utils/helper";
import transcriptService from "../services/transcript";
//Testing purposes delete late

const Transcript = ({ audioPlayerRef, transcriptName }) => {
	const [transcript, setTranscript] = useState([]);
	const wordsRef = useRef(null);
	const [highlightPos, setHighlightPos] = useState(null);

	//change this once backend is finalized
	useEffect(() => {
		if (transcriptName) {
			transcriptService
				.getTranscript(transcriptName)
				.then((data) => {
					setTranscript(utils.formatTranscript(data.segments));
				})
				.catch((error) => console.log(error));
		}
	}, [transcriptName]);

	useEffect(() => {
		const playerCur = audioPlayerRef.current;

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

		if (playerCur) {
			return () => {
				playerCur.removeEventListener("timeupdate", ontimeupdate);
			};
		}
	}, [audioPlayerRef, transcript]);

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

	if (!Array.isArray(transcript) || !transcript.length) {
		console.log(transcript);
		return <div>transcript not loaded in yet</div>;
	}

	return (
		<div ref={wordsRef} style={{ position: "relative" }}>
			{transcript.map((words) => (
				<span
					key={`${words.word}-${words.start}`}
					onClick={() => onWordClick(words)}
					style={{ padding: 0, margin: 0 }}
				>
					{words.word}
				</span>
			))}
			<div
				className="highlight"
				style={{ ...highlightPos, position: "absolute" }}
			></div>
		</div>
	);
};

export default Transcript;
