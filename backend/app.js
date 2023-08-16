const express = require("express");
const transcriptRouter = require("./controllers/transcript");
const audioRouter = require("./controllers/audio");

const app = express();

app.use("/api/transcripts", transcriptRouter);
app.use("/api/audio", audioRouter);

module.exports = app;
