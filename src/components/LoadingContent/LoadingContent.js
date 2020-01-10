import React, { Component } from 'react';
import { Box, Text } from 'grommet';

class LoadingContent extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Box fill={true} margin={{"top": "medium"}}>
                <Text>
                    {this.props.message || "Loading..."}
                </Text>
            </Box>
        )
    }
}

export default LoadingContent;