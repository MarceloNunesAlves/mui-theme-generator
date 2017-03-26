import React from 'react';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';


export const TopBar = ({ themeName, changeBaseTheme, openDialog, selectFile }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'strech', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, marginLeft: 40 }}>
            <a href="http://www.material-ui.com/#/" style={{ paddingRight: 7 }}>Mui</a> Theme Generator
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <span style={{ margin: 10 }}>LIGHT</span>
                <Toggle
                    labelPosition="right"
                    style={{ verticalAlign: 'middle', display: 'inline-block', width: 'auto' }}
                    toggled={themeName === "dark"}
                    onToggle={(evt, checked) => changeBaseTheme(checked ? "dark" : "light")}
                />
                <span style={{ marginRight: 10 }}>DARK</span>
            </div>
            <FlatButton label="Load" primary={true} style={{ height: '100%' }} onTouchTap={selectFile} />
            <FlatButton label="Generate" primary={true} style={{ height: '100%' }} onTouchTap={openDialog} />
            <a href="https://github.com/cimdalli/mui-theme-generator" style={{ height: '100%' }}>
                <IconButton iconClassName="muidocs-icon-custom-github" style={{ height: '100%' }} />
            </a>
        </div>
    </div>
);