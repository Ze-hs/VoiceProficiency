import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import audioServices from "../services/audioList";

//Material UI imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const DropZone = () => {
	const onDrop = useCallback((acceptedFiles) => {
		audioServices.createAudio(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	//Style
	const DropZoneArea = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		borderWidth: "2px",
		borderRadius: "2px",
		borderStyle: "dashed",
		backgroundColor: "#fafafa",
		color: "#bdbdbd",
		outline: "none",
		transition: "border .24s ease-in-out",
		paddingBlock: "1rem",
	};

	return (
		<Box mt={5}>
			<Typography>Add more audio</Typography>
			<div style={{ ...DropZoneArea }} {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<Typography>Drop the files here ...</Typography>
				) : (
					<Typography>
						Drag 'n' drop some files here, or click to select files
					</Typography>
				)}
			</div>
		</Box>
	);
};

export default DropZone;
