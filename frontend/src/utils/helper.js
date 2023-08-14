const formatTime = (seconds) => {
	let min = Math.floor(seconds / 60);
	min = min >= 10 ? min : "0" + min;
	let sec = Math.floor(seconds % 60);
	sec = sec >= 10 ? sec : "0" + sec;
	return min + ":" + sec;
};

const formatTranscript = (transcript) => {
	return transcript.reduce((prev, curr) => {
		return prev.concat(curr.words);
	}, []);
};

const formatFileName = (filename) => {
	return filename.replace(/\.[^/.]+$/, "");
};

export default { formatTime, formatTranscript, formatFileName };
