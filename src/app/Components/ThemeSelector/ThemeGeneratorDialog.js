import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    radioButton: {
        marginTop: 16,
    },
};

const generateJson = (data) => {
    return JSON.stringify(data, null, 4);
}

export const ThemeGeneratorDialog = ({ open, handleOpen, handleClose, palette, themeName }) => {

    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleClose}
        />,
        <FlatButton
            label="Download"
            primary={true}
            keyboardFocused={true}
            onTouchTap={handleClose}
        />
    ];

    return (
        <div>
            <Dialog
                title="Theme Generator Dialog"
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={handleClose}
                autoScrollBodyContent={true}
            >
                <pre>
                    {
                        "import getMuiTheme from 'material-ui/styles/getMuiTheme';" + "\n" +
                        `import baseTheme from 'material-ui/styles/baseThemes/${themeName}BaseTheme';` + "\n" +
                        "import * as Colors from 'material-ui/styles/colors';" + "\n\n" +

                        "const getTheme = () => {" + "\n" +
                        "  " + `let palette = ${generateJson(palette)};` + "\n" +
                        "  " + "return getMuiTheme(baseTheme, { palette });" + "\n" +
                        "}"
                    }

                </pre>
            </Dialog>
        </div>
    );
}

ThemeGeneratorDialog.prototype.isPureReactComponent = true;