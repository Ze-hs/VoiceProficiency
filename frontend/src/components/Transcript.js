import React, { useEffect, useRef, useState } from "react";
import transcriptData from "../audio/Sample.json";
import utils from "../utils/helper";

//Testing purposes delete late
import data from "../audio/Sample.json";

const Transcript = ({ audioPlayerRef }) => {
	const [transcript, setTranscript] = useState([]);
	const wordsRef = useRef(null);
	const [highlightPos, setHighlightPos] = useState(null);

	//change this once backend is finalized
	useEffect(() => {
		setTranscript(utils.formatTranscript(transcriptData.segments));
	}, []);

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

		return () => {
			playerCur.removeEventListener("timeupdate", ontimeupdate);
		};
	}, [audioPlayerRef, transcript]);

	const getWordProperty = (parent, child) => {
		return {
			width: child.width,
			height: child.height,
			top: child.top - parent.top,
			left: child.left - parent.left,
		};
	};

	const getConfidenceStyle = (confidence) => {
		// return confidence;
	};

	const onWordClick = (word) => {
		audioPlayerRef.current.currentTime = word.start;
	};

	return (
		<div ref={wordsRef} style={{ position: "relative" }}>
			{data.segments.map((wordsArr) =>
				wordsArr.words.map((words) => (
					<span
						onClick={() => onWordClick(words)}
						className={getConfidenceStyle(words.probability)}
						style={{ padding: 0, margin: 0 }}
					>
						{words.word}
					</span>
				))
			)}
			<div
				className="highlight"
				style={{ ...highlightPos, position: "absolute" }}
			></div>
		</div>
	);
};

export default Transcript;
