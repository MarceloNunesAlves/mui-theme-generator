import React from 'react';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export class TopBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleSelectAction = (callback) => () => {
        this.handleRequestClose();
        callback();
    }

    render() {
        let { themeName, changeBaseTheme, openGeneratorDialog, openLoadDialog, selectFile } = this.props;

        return (
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

                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText="Text" onTouchTap={this.handleSelectAction(openLoadDialog)} />
                            <MenuItem primaryText="File" onTouchTap={this.handleSelectAction(selectFile)} />
                        </Menu>
                    </Popover>
                    <FlatButton label="Load" primary={true} style={{ height: '100%' }} onTouchTap={this.handleTouchTap} />
                    <FlatButton label="Generate" primary={true} style={{ height: '100%' }} onTouchTap={openGeneratorDialog} />
                    <a href="https://github.com/cimdalli/mui-theme-generator" style={{ height: '100%' }}>
                        <IconButton iconClassName="muidocs-icon-custom-github" style={{ height: '100%' }} />
                    </a>
                </div>
            </div>
        );
    }
}