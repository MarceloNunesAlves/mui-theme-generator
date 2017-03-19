import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';


const styles = {
    tabsContainer: {
        width: '200px',
        margin: 'auto'
    },
    tabs: {
        backgroundColor: "rgba(255, 255, 255, 0.13)"
    },
    tab: {
        color: 'black'
    }
};

export const ThemeSwitcher = ({ initialTheme, changeBaseTheme }) => (
    <div style={{ margin: '30px' }}>
        <Tabs value={initialTheme} onChange={changeBaseTheme} tabItemContainerStyle={styles.tabs} style={styles.tabsContainer} >
            <Tab label="light" value="light" buttonStyle={styles.tab} />
            <Tab label="dark" value="dark" buttonStyle={styles.tab} />
        </Tabs>
        {/*<RaisedButton label="Light theme base" onTouchTap={this.props.changeTheme} />
                <RaisedButton label="Dark theme base" onTouchTap={this.props.changeTheme} />*/}
    </div>
);
