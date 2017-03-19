import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

import { ColorPicker } from './ColorPicker';


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

export const ThemeSwitcher = ({ initialTheme, changeBaseTheme, theme }) => (
    <div style={{ margin: '30px' }}>
        <Tabs value={initialTheme} onChange={changeBaseTheme} tabItemContainerStyle={styles.tabs} style={styles.tabsContainer} >
            <Tab label="light" value="light" buttonStyle={styles.tab} />
            <Tab label="dark" value="dark" buttonStyle={styles.tab} />
        </Tabs>

        <table style={{ marginTop: 20, fontSize: 16, borderSpacing: 10 }}>
            <thead>
                <tr style={{ fontWeight: 500 }}>
                    <td>Key</td>
                    <td>Base Theme</td>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(theme.palette).map(key =>
                        <tr key={key}>
                            <td>{key}</td>
                            <td>
                                <ColorPicker color={theme.palette[key]} />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
);
