const soundRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

//To run command line from node
const { exec } = require("child_process");

//Setting properties for saving to local machine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/audio/");
	},

	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extension);
		req.newName = `${basename}-${Date.now()}${extension}`;
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
	//move to middleware
	if (!req.file) {
		return res.status(400).json({ error: "No audio file uploaded" });
	}

	const child = exec(
		// "cd public/audio; ls",
		`cd public/audio; whisper ${req.newName}  -o "../transcripts" --language English --output_format json --task transcribe --fp16 False --word_timestamps True`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			// console.log(`stderr: ${stderr}`);
		}
	);

	res.json({ message: "Sound uploaded successfully" });
});

module.exports = soundRouter;
