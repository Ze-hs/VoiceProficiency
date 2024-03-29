import axios from "axios";

const baseUrl = "/api/audio";

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const getAudio = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`, {
		responseType: "blob",
	});
	return request.data;
};

const createAudio = async (files) => {
	const fd = new FormData();
	fd.append("audio", files[0], files[0].name);

	const request = await axios.post(baseUrl, fd, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return request;
};

export default { getAll, getAudio, createAudio };
