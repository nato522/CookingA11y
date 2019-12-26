import React, { Component } from "react";
import "./FooterWebpage.css";
import {Box, Grommet, Footer, Text} from 'grommet';

// /* theme needs to be moved in FooterWebpage.css* or a file for all the components/
const theme = {
	global: {
		colors: {
			brand: 'black',
		},
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		},
	},
};

const AppBar = (props) => (
	<Box
		align='center'
		justify='center'
		background= 'grey'
		{...props}
	/>
);


class FooterWebpage extends Component {

	render() {
		return (
			<Grommet theme={theme}>
				<AppBar>
					<Footer pad="medium">
						<Text>Copyright</Text>
					</Footer>
				</AppBar>
			</Grommet>
		);
	}
}

export default FooterWebpage;