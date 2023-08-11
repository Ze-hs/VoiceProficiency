import React, { useEffect, useRef, useState } from "react";
import transcriptData from "../audio/Sample.json";
import utils from "../utils/helper";
//Testing purposes delete late
import data from "../audio/Sample.json";

const Transcript = ({ audioPlayerRef }) => {
	const [transcript, setTranscript] = useState([]);
	const wordsRef = useRef(null);
	const [highlightPos, setHighlightPos] = useState(null);
	const highlightRef = useRef(null);

	useEffect(() => {
		setTranscript(utils.formatTranscript(transcriptData.segments));
	}, []);

	useEffect(() => {
		console.log(transcript);

		const ontimeupdate = () => {
			const activeWordIndex = transcript.findIndex((word) => {
				return word.start > audioPlayerRef.current.currentTime;
			});

			if (activeWordIndex !== -1) {
				const activeWord = wordsRef.current.childNodes[activeWordIndex];
				setHighlightPos(getWordProperty(activeWord));

				highlightRef.current.cssText = getWordProperty(activeWord);
			}

			// activeWord.classList.add("active-word");
		};

		if (audioPlayerRef && audioPlayerRef.current) {
			audioPlayerRef.current.addEventListener("timeupdate", ontimeupdate);
		}
	}, [audioPlayerRef, transcript]);

	const getWordProperty = ({
		offsetWidth,
		offsetHeight,
		offsetTop,
		offsetLeft,
	}) => {
		const style = {
			width: offsetWidth,
			height: offsetHeight,
			top: offsetTop,
			left: offsetLeft,
		};

		console.log(JSON.stringify(style));
		return "";
	};

	const getConfidenceStyle = (confidence) => {
		// return confidence;
	};

	return (
		<div style={{ position: "relative" }}>
			<span ref={wordsRef}>
				{data.segments.map((wordsArr) =>
					wordsArr.words.map((words) => (
						<span className={getConfidenceStyle(words.probability)}>
							{words.word}
						</span>
					))
				)}
			</span>
			<div className="highlight" ref={highlightRef}></div>
		</div>
	);
};

export default Transcript;
