const soundRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//Setting properties for saving to local machine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("dest: ", file);
		cb(null, "./public/audio/");
	},
	onFileUploadStart: function (file) {
		console.log(file.fieldname + " is starting ...");
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extension);

		cb(null, `${basename}-${Date.now()}${extension}`);
	},
});

const upload = multer({ storage: storage });

soundRouter.get("/", async (req, res) => {
	const filePath = path.join(__dirname, "../public", "audio");
	fs.readdir(filePath, (err, files) => {
		let soundList = [];
		files.forEach((file) => {
			soundList = soundList.concat(file);
		});

		return res.json(soundList);
	});
});

soundRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	const filePath = path.join(__dirname, "../public", "audio", id);

	res.sendFile(filePath);
});

soundRouter.post("/", upload.single("audio"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No audio file uploaded" });
	}

	res.json({ message: "Sound uploaded successfully" });
});

module.exports = soundRouter;
