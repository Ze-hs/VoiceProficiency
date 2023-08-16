import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

import store from "./store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles/index.css";

const theme = createTheme({
	typography: {
		fontFamily: "Montserrat",
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>
);
