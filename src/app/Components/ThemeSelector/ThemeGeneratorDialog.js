import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FileSaver from 'file-saver'
import copy from 'copy-to-clipboard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

import { ColorInfo } from '../../utils/ColorHelper'


const mapColorsToColorTone = (data) => {
    if (typeof data === "string") {
        let colorInfo = new ColorInfo(data);
        let colorTone = colorInfo.colorTone;
        let alpha = colorInfo.getAlpha();
        
        if (colorTone) {
            let color = "Colors." + colorTone.get();
            if (alpha != 1)
                return `fade(${color}, ${alpha})`;
            return color;
        }
        return data;
    }

    return Object.keys(data).reduce((result, key) => {
        result[key] = mapColorsToColorTone(data[key]);
        return result;
    }, {});
}

const generateJson = (data) => {
    return JSON.stringify(data, null, 4);
}

export class ThemeGeneratorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            includeImport: false,
            mapColors: false,
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
            label="Copy"
            primary={true}
            onTouchTap={this.copyToClipboard}
        />,
        <FlatButton
            label="Download"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.downloadFile}
        />
    ];

    generateContent() {
        let { themeName, overwrites } = this.props;
        let { includeImport, mapColors } = this.state;

        overwrites = mapColors ? mapColorsToColorTone(overwrites) : overwrites;
        let json = generateJson(overwrites)
            .replace(/\"(Colors\..+)\"/g, "$1")
            .replace(/\"(fade.+)\"/g, "$1");

        return includeImport ?
            "import getMuiTheme from 'material-ui/styles/getMuiTheme';" + "\n" +
            `import baseTheme from 'material-ui/styles/baseThemes/${themeName}BaseTheme';` + "\n" +
            "import * as Colors from 'material-ui/styles/colors';" + "\n" +
            "import { fade } from 'material-ui/utils/colorManipulator'" + "\n\n" +

            "const getTheme = () => {" + "\n" +
            "  " + `let overwrites = ${json};` + "\n" +
            "  " + "return getMuiTheme(baseTheme, overwrites);" + "\n" +
            "}"
            : json
    }

    downloadFile = () => {
        var blob = new Blob([this.generateContent()], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "theme.js");
        this.props.handleClose();
    }

    copyToClipboard = () => {
        copy(this.generateContent());
        this.setState({ snackOpen: true });
    }

    handleRequestClose = () => {
        this.setState({ snackOpen: false });
    };

    render() {
        let { handleClose, open } = this.props;
        let { includeImport, mapColors } = this.state;

        return (
            <div>
                <Dialog
                    title="Theme Generator Dialog"
                    actions={this.actions(handleClose)}
                    modal={false}
                    open={open}
                    onRequestClose={handleClose}
                    autoScrollBodyContent={true}
                    contentStyle={{ marginTop: -120 }}
                >
                    <pre>
                        {
                            this.generateContent()
                        }
                    </pre>
                    <div style={{ position: 'absolute', bottom: 14, display: 'flex' }}>
                        <Toggle
                            label="Map colors"
                            labelPosition="right"
                            style={{ width: 'auto', marginRight: 20 }}
                            toggled={mapColors}
                            onToggle={(evt, mapColors) => this.setState({ mapColors })}
                        />
                        <Toggle
                            label="Include import section"
                            labelPosition="right"
                            style={{ width: 'auto', marginRight: 20 }}
                            toggled={includeImport}
                            onToggle={(evt, includeImport) => this.setState({ includeImport })}
                        />
                    </div>
                </Dialog>

                <Snackbar
                    open={this.state.snackOpen}
                    message="Copied"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

ThemeGeneratorDialog.prototype.isPureReactComponent = true;