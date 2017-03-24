import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    left: {
        // display: 'flex',
    },
    right: {
        width: 500,
        flexShrink: 0
    },
    rightInner: {
        position: 'fixed',
        height: '100%',
        width: 'inherit'
    },
    scrollContent: {
        overflowY: 'overlay',
        height: '100%'
    }
};

export const Layout = ({ muiTheme, mainContent, sidebar, children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Paper zDepth={1} >
            <div style={styles.container}>
                <div style={styles.left}>
                    {mainContent}
                    {children}
                </div>
                <div style={styles.right}>
                    <div style={styles.rightInner}>
                        <div style={styles.scrollContent}>
                            {sidebar}
                        </div>
                    </div>
                </div>
            </div>
            <a style={{ position: 'fixed', top: -8, right: 8 }} href="https://github.com/cimdalli/mui-theme-generator">
                <IconButton iconClassName="muidocs-icon-custom-github" />
            </a>
        </Paper>
    </MuiThemeProvider>
);