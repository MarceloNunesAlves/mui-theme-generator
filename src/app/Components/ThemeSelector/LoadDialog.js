import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { fade } from 'material-ui/utils/colorManipulator'
// import { ColorHelper } from '../../utils/ColorHelper'
import * as ColorTones from 'material-ui/styles/colors'


export class LoadDialog extends React.Component {
    constructor() {
        super();

        this.state = {
            value: "",
            errorText: undefined,
            snackOpen: false
        }
    }

    actions = (handleClose) => [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleClose}
        />,
        <FlatButton
            label="Load"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.loadTheme}
            disabled={this.state.errorText === undefined || this.state.errorText !== null}
        />
    ];

    loadTheme = () => {
        this.props.setOverwrites(this.state.value);
        this.props.handleClose();
        this.setState({ snackOpen: true });
    }

    parseColorTone = (colorTone) => {
        if (ColorTones[colorTone])
            return ColorTones[colorTone];
        throw new Error("Invalid color code: " + colorTone);
    }

    handleChange = (event) => {
        var errorText = null;
        var value = event.target.value;
        try {
            value = value
                .replace(/(Colors\.)(\w+)/g, (match, $1, $2) => '"' + this.parseColorTone($2) + '"')
                .replace(/(fade\(\"(.+)\"\s*,\s*(.+)\))/g, (match, $1, $2, $3) => '"' + fade($2, $3) + '"');
            value = JSON.parse(value);
            if (typeof value !== "object") {
                throw new Error("Not valid object");
            }
        }
        catch (e) {
            errorText = e.message;
        }

        this.setState({
            value,
            errorText
        });
    };

    handleRequestClose = () => {
        this.setState({ snackOpen: false });
    };

    render() {
        let { handleClose, open } = this.props;

        return (
            <div>
                <Dialog
                    title="Load Theme Dialog"
                    actions={this.actions(handleClose)}
                    modal={false}
                    open={open}
                    onRequestClose={handleClose}
                    contentStyle={{ marginTop: -120 }}
                >
                    <TextField
                        hintText="Paste theme (JSON)"
                        onChange={this.handleChange}
                        errorText={this.state.errorText}
                        multiLine={true}
                        rows={1}
                        rowsMax={10}
                        fullWidth={true}
                    />
                </Dialog>

                <Snackbar
                    open={this.state.snackOpen}
                    message="Loaded"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
} 