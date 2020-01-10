import React, { Component } from "react";
import "./FooterWebpage.css";
import {
	Box, Grommet, Footer, Text
} from 'grommet';

import Theme from "../../styles/Theme";

class FooterWebpage extends Component {
	render() {
		return (
			<Grommet theme={Theme}>
				<Footer background="brand" pad="small" justify="center" margin={{"top":"small"}}>
					<Text size="small">Copyright</Text>
				</Footer>
			</Grommet>
		);
	}
}

export default FooterWebpage;