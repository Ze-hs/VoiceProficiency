import React, { useEffect } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
	const {
		transcript,
		interimTranscript,
		finalTranscript,
		resetTranscript,
		listening,
	} = useSpeechRecognition();

	const listenContinuously = () => {
		SpeechRecognition.startListening({
			continuous: true,
			language: "en-GB",
		});
	};

	useEffect(() => {
		if (finalTranscript !== "") {
			console.log("Got final result:", finalTranscript);
		}
	}, [interimTranscript, finalTranscript]);

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		console.log(
			"Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
		);
	}

	return (
		<div>
			<div>
				<span>listening: {listening ? "on" : "off"}</span>
				<div>
					<button type="button" onClick={resetTranscript}>
						Reset
					</button>
					<button type="button" onClick={listenContinuously}>
						Listen
					</button>
					<button
						type="button"
						onClick={SpeechRecognition.stopListening}
					>
						Stop
					</button>
				</div>
			</div>
			<div>
				<h2>Transcript</h2>
				{console.log(interimTranscript)}
				<span>{transcript}</span>
			</div>
		</div>
	);
};

export default Dictaphone;
