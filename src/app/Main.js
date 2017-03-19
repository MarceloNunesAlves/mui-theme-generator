import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Components from './Components'
import { ThemeSwitcher } from './ThemeSwitcher'

const styles = {
    container: {
    }
};

export default class Main extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            baseTheme: "dark"
        };
    }

    handleBaseThemeChange = (baseTheme) => {
        this.setState({
            baseTheme
        });
    };

    render() {
        let baseTheme = this.state.baseTheme === "dark" ? darkBaseTheme : null;
        let muiTheme = getMuiTheme({
            // palette: {
            //     // accent1Color: deepOrange500,
            // },

        }, baseTheme);

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper style={{}} zDepth={1} >
                    <table style={styles.container}>
                        <tbody>
                            <tr>
                                <td style={{ width: '60%', paddingRight: 30, borderRight: '1px dashed', borderColor: muiTheme.palette.disabledColor }}>
                                    <Components />
                                </td>
                                <td style={{ width: '40%', position: 'fixed' }}>
                                    <ThemeSwitcher initialTheme={this.state.baseTheme} changeBaseTheme={this.handleBaseThemeChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Paper>
            </MuiThemeProvider>
        );
    }
}