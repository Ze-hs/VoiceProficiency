const express = require("express");
const transcriptRouter = require("./controllers/transcript");
const app = express();

app.use("/api/transcripts", transcriptRouter);

module.exports = app;
