const soundRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

soundRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	const filePath = path.join(__dirname, "../public", "audio", id);
	console.log(filePath);

	res.sendFile(filePath);
});

module.exports = soundRouter;
