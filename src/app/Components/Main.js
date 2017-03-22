import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import Components from './Components'
import ThemeSelector from '../ThemeSelector/ThemeSelector'

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        // display: 'flex',
    },
    right: {
        width: 450,
        flexShrink: 0
    },
    rightInner: {
        position: 'fixed',
        height: '100%'
    },
    scrollContent: {
        overflowY: 'overlay',
        height: '100%'
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
                <Paper zDepth={1} >
                    <div style={styles.container}>
                        <div style={styles.left}>
                            <Components />
                        </div>
                        <div style={styles.right}>
                            <div style={styles.rightInner}>
                                <div style={styles.scrollContent}>
                                    <ThemeSelector
                                        initialTheme={this.state.baseTheme}
                                        changeBaseTheme={this.handleBaseThemeChange}
                                        theme={muiTheme}
                                        onColorChange={this.handleonColorChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <a style={{ position: 'fixed', top: 2, right: 5 }} href="https://github.com/cimdalli/mui-theme-generator">
                        <IconButton iconClassName="muidocs-icon-custom-github" />
                    </a>
                </Paper>
            </MuiThemeProvider>
        );
    }
}