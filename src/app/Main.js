import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
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

    handleonColorChange = (key, newValue) => {
        var palette = Object.assign({}, this.state.palette, { [key]: newValue });
        this.setState({
            palette
        });
    }

    render() {
        let baseTheme = this.state.baseTheme === "dark" ? darkBaseTheme : null;
        let palette = this.state.palette;
        let muiTheme = getMuiTheme(baseTheme, { palette });

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
                                    <ThemeSwitcher
                                        initialTheme={this.state.baseTheme}
                                        changeBaseTheme={this.handleBaseThemeChange}
                                        theme={muiTheme}
                                        onColorChange={this.handleonColorChange} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a style={{ position: 'fixed', top: 2, right: 5 }} href="https://github.com/cimdalli/mui-theme-generator">
                        <IconButton iconClassName="muidocs-icon-custom-github" />
                    </a>
                </Paper>
            </MuiThemeProvider>
        );
    }
}