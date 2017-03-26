import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { Layout } from './Layout';
import Components from '../Components/Components';
import { ThemeGeneratorDialog } from '../Components/ThemeSelector/ThemeGeneratorDialog';
import ColorPicker from '../Components/ThemeSelector/ColorPicker';
import { SideBar } from '../Components/Layout/sidebar'
import { TopBar } from '../Components/Layout/topbar'


const styles = {
    container: {
        listItem: {
            innerDiv: {
                paddingTop: 6,
                paddingBottom: 6
            },
            rightIcon: {
                top: 0,
                marginTop: 10
            },
            leftIcon: {
                marginTop: 0,
                padding: 0
            }
        }
    }
}

const createNested = (keys, val, base) => {
    const lastKey = keys.pop();
    base = Object.assign({}, base);
    const lastObj = keys.reduce((result, key) => result[key] = result[key] || {}, base);
    lastObj[lastKey] = val;
    return base;
};

const deleteNested = (val, keys) => {
    let filtered = {};
    const firstKey = keys && keys.shift();

    if (firstKey === undefined)
        return val;

    if (keys.length === 0) {
        return Object.keys(val)
            .filter(x => x !== firstKey)
            .reduce((result, key) => {
                result[key] = val[key];
                return result;
            }, filtered);
    }

    let nested = deleteNested(val[firstKey], keys);
    if (!!Object.keys(nested).length) {
        filtered[firstKey] = nested;
    }

    return filtered;
}

const defaulTheme = getMuiTheme();
const componentList = Object.keys(defaulTheme)
    .filter(x => ['palette', 'baseTheme', 'rawTheme'].indexOf(x) === -1 && typeof defaulTheme[x] === "object");

export default class Main extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            themeName: "dark",
            overwrites: {},
            dialogOpen: false
        };
    }

    handleBaseThemeChange = (themeName) => {
        this.setState({ themeName });
    };

    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    addToOverwrites = (keys, newValue) => {
        var overwrites = createNested(keys, newValue, this.state.overwrites);
        this.setState({ overwrites });
    }

    removeFromOverwrites = (omitted) => {
        var overwrites = deleteNested(this.state.overwrites, omitted);
        this.setState({ overwrites });
    }

    selectFile = () => {
        this.refs.fileUploader.click();
    }

    readFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            var overwrites = JSON.parse(reader.result);
            if (overwrites) {
                this.setState({
                    overwrites
                });
            }
        }
        reader.readAsText(file);
        // reader.readAsDataURL(file)
    }

    render() {
        let themeBase = this.state.themeName === "dark" ? darkBaseTheme : null;
        let overwrites = this.state.overwrites || {};
        let muiTheme = getMuiTheme(themeBase, overwrites);

        let { palette, baseTheme, rawTheme, isRtl, fontFamily, ...components } = muiTheme;

        let topBar = <TopBar
            changeBaseTheme={this.handleBaseThemeChange}
            themeName={this.state.themeName}
            openDialog={this.handleDialogOpen}
            selectFile={this.selectFile}
        />

        let sideBar = <SideBar
            palette={palette}
            components={components}
            overwrites={overwrites}
            addToOverwrites={this.addToOverwrites}
            removeFromOverwrites={this.removeFromOverwrites}
        />

        return (
            <Layout
                muiTheme={muiTheme}
                topBar={topBar}
                sideBar={sideBar}
                mainContent={<Components />}
            >
                <input type="file" id="file" ref="fileUploader"
                    style={{ display: "none" }}
                    onChange={(event) => { this.readFile(event) }}
                    onClick={(event) => { event.target.value = null }} />
                <ThemeGeneratorDialog
                    open={this.state.dialogOpen}
                    handleOpen={this.handleDialogOpen}
                    handleClose={this.handleDialogClose}
                    overwrites={overwrites}
                    themeName={this.state.themeName}
                />
            </Layout>
        );
    }
}