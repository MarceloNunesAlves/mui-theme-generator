import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FileSaver from 'file-saver'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';


const generateJson = (data) => {
    return JSON.stringify(data, null, 4);
}

export class ThemeGeneratorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            includeImport: false
        }

        this.generateContent = this.generateContent.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    actions = (handleClose) => [
        <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={handleClose}
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
        let { includeImport } = this.state;

        return includeImport ?
            "import getMuiTheme from 'material-ui/styles/getMuiTheme';" + "\n" +
            `import baseTheme from 'material-ui/styles/baseThemes/${themeName}BaseTheme';` + "\n" +
            "import * as Colors from 'material-ui/styles/colors';" + "\n\n" +

            "const getTheme = () => {" + "\n" +
            "  " + `let overwrites = ${generateJson(overwrites)};` + "\n" +
            "  " + "return getMuiTheme(baseTheme, overwrites);" + "\n" +
            "}"
            :
            generateJson(overwrites)
    }

    downloadFile() {
        var blob = new Blob([this.generateContent()], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "theme.js");
        this.props.handleClose();
    }

    render() {
        let { handleClose, open } = this.props;
        let { includeImport } = this.state;

        return (
            <div>
                <Dialog
                    title="Theme Generator Dialog"
                    actions={this.actions(handleClose)}
                    modal={false}
                    open={open}
                    onRequestClose={handleClose}
                    autoScrollBodyContent={true}
                >
                    <pre>
                        {
                            this.generateContent()
                        }
                    </pre>
                    <div style={{ position: 'absolute', bottom: 14 }}>
                        <Toggle
                            label="Include import section"
                            labelPosition="right"
                            toggled={includeImport}
                            onToggle={(evt, includeImport) => this.setState({ includeImport })}
                        />
                    </div>
                </Dialog>
            </div>
        );
    }
}

ThemeGeneratorDialog.prototype.isPureReactComponent = true;