import React, { Component } from "react";
import "./SkipToContent.css";
import {Anchor, Box, Grommet} from 'grommet';

/* theme needs to be moved in SkipToContent.css* or have a css for the components folder */
const theme = {
	global: {
		colors: {
			brand: 'black',
		},
		font: {
			family: 'Roboto',
			size: '13px',
		},
	},
};

const AppBar = (props) => (
	<Box
		align='start'
		background= '#E0E3F0'
		pad={{ left: 'medium'}}
		{...props}
	/>
);


class SkipToContent extends Component {

	render() {
		return (
			<Grommet theme={theme}>
				<AppBar>
					<Anchor>Skip to Content</Anchor>
				</AppBar>
			</Grommet>
		);
	}
}

export default SkipToContent;