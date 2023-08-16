const transcriptRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

transcriptRouter.get("/", async (req, res) => {
	const filePath = path.join(__dirname, "../public", "transcripts");
	fs.readdir(filePath, (err, files) => {
		let transcriptList = [];
		files.forEach((file) => {
			transcriptList = transcriptList.concat(file);
		});

		return res.json(transcriptList);
	});
});

transcriptRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	const filePath = path.join(__dirname, "../public", "transcripts", id);

	fs.readFile(filePath, "utf8", (err, data) => {
		return res.json(JSON.parse(data));
	});
});

module.exports = transcriptRouter;
