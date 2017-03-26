import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
    toolbar: {
        position: 'fixed',
        zIndex: 9999,
        height: 65,
        width: '100%'
    },
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        height: '100%'
    },
    left: {
        // display: 'flex',
    },
    right: {
        width: 500,
        flexShrink: 0
    },
    rightFixed: {
        position: 'fixed',
        height: '100%',
        width: 'inherit'
    },
    rightScrollContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflowY: 'overlay',
        paddingLeft: 30,
        paddingRight: 20,
        marginRight: 3
    }
};


export const Layout = ({ muiTheme, topBar, sideBar, mainContent, children }) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Paper zDepth={1} >
            <Paper zDepth={2} style={styles.toolbar}>
                {topBar}
            </Paper>
            <div style={{ ...styles.container, paddingTop: styles.toolbar.height }}>
                <div style={styles.left}>
                    {mainContent}
                    {children}
                </div>
                <div style={styles.right}>
                    <div style={styles.rightFixed}>
                        <div style={{ ...styles.rightScrollContent, bottom: styles.toolbar.height }} >
                            {sideBar}
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    </MuiThemeProvider>
);