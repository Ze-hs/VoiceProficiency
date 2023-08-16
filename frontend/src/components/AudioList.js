import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentAudio } from "../reducers/audioReducer";
import {
	setTranscriptName,
	getcurrentTranscript,
} from "../reducers/transcriptReducer";

//Material UI imports
import Drawer from "@mui/material/Drawer";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import { List, ListItemButton, ListItemText } from "@mui/material";

const AudioList = () => {
	const dispatch = useDispatch();
	const audioList = useSelector((state) => state.audioList.all);

	const handleClick = (audioName) => {
		dispatch(setCurrentAudio(audioName));
		dispatch(setTranscriptName(audioName));
		dispatch(getcurrentTranscript());
	};

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 240,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: 240,
					boxSizing: "border-box",
				},
			}}
		>
			<List
				subheader={
					<ListSubheader sx={{ fontSize: "1em" }}>
						Audio
					</ListSubheader>
				}
			>
				<Divider></Divider>
				{audioList.map((audio) => (
					<ListItemButton
						key={audio}
						onClick={() => handleClick(audio)}
					>
						<ListItemText
							primaryTypographyProps={{ fontSize: ".9em" }}
						>
							{audio}
						</ListItemText>
					</ListItemButton>
				))}
			</List>
		</Drawer>
	);
};

export default AudioList;
