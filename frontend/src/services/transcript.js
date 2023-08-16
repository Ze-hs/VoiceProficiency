import axios from "axios";

const baseUrl = "/api/transcripts";

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const getTranscript = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`);
	return request.data;
};

export default { getAll, getTranscript };
