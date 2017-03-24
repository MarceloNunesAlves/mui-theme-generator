import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';


export default ({ themeName, changeBaseTheme, openDialog, children }) => (
    <div style={{ margin: '30px' }}>
        <div style={{ display: 'flex' }}>
            <Tabs value={themeName} onChange={changeBaseTheme} style={{ flexGrow: 1 }} >
                <Tab label="light" value="light" />
                <Tab label="dark" value="dark" />
            </Tabs>
            <FlatButton
                label="Generate"
                style={{ height: 48 }}
                onTouchTap={openDialog}
            />
        </div>
        {children}
    </div>
);
