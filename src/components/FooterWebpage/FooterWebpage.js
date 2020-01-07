import React, { Component } from "react";
import "./FooterWebpage.css";
import {
	Box, Grommet, Footer, Text
} from 'grommet';

import Theme from "../../styles/Theme";

const AppBar = (props) => (
	<Box
		align='center'
		justify='center'
		background= 'brand'
		{...props}
	/>
);

class FooterWebpage extends Component {
	render() {
		return (
			<Grommet theme={Theme}>
				<AppBar>
					<Footer pad="medium">
						<Text size="small">Copyright</Text>
					</Footer>
				</AppBar>
			</Grommet>
		);
	}
}

export default FooterWebpage;