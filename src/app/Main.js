/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Components from './Components'

const styles = {
    container: {

    }
};

const muiTheme = getMuiTheme({
    palette: {
        // accent1Color: deepOrange500,
    },
});

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Components />
                </div>
            </MuiThemeProvider>
        );
    }
}