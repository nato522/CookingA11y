import React, { Component } from "react";
import "./SkipToContent.css";
import {Box, Grommet, SkipLink,} from 'grommet';
import theme from "../../styles/Theme"

const AppBar = (props) => (
	<Box
		align='start'
		background= 'grey'
		pad={{ left: 'medium'}}
		{...props}
	/>
);

class SkipToContent extends Component {

	render() {
		return (
			<Grommet theme={theme}>
				<AppBar>
					<SkipLink id="mainContent" target="_self" label="Skip to content" />
				</AppBar>
			</Grommet>
		);
	}
}

export default SkipToContent;