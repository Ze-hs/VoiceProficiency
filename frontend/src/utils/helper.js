const formatTime = (seconds) => {
	console.log(seconds);
};

const formatTranscript = (transcript) => {
	return transcript.reduce((prev, curr) => {
		return prev.concat(curr.words);
	}, []);
};

export default { formatTime, formatTranscript };
