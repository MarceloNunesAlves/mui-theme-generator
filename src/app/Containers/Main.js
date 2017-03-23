import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import ImagePalette from 'material-ui/svg-icons/image/palette';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Layout from './Layout';
import Components from '../Components/Components';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import ThemeGeneratorDialog from '../ThemeSelector/ThemeGeneratorDialog';
import ColorPicker from '../ThemeSelector/ColorPicker';


export default class Main extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            themeName: "dark",
            palette: {},
            dialogOpen: false
        };
    }

    handleBaseThemeChange = (themeName) => {
        this.setState({
            themeName
        });
    };

    handleonColorChange = (key, newValue) => {
        var palette = Object.assign({}, this.state.palette, { [key]: newValue });
        this.setState({
            palette
        });
    }
    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    }

    removeFromPalette = (omitted) => {
        var palette = Object.keys(this.state.palette)
            .filter(key => key != omitted)
            .reduce((result, key) => {
                result[key] = this.state.palette[key];
                return result;
            }, {});

        this.setState({
            palette
        });
    }

    render() {
        let baseTheme = this.state.themeName === "dark" ? darkBaseTheme : null;
        let palette = this.state.palette;
        let muiTheme = getMuiTheme(baseTheme, { palette });
        let components = Object.assign(...
            Object.keys(muiTheme)
                .filter(x => x != 'palette')
                .map(x => ({ [x]: muiTheme[x] })));

        let nestedItems = Object.keys(muiTheme.palette).map((key, i) => <ListItem
            key={key}
            primaryText={key}
            secondaryText={muiTheme.palette[key]}
            primaryTogglesNestedList={true}
            innerDivStyle={{ paddingTop: 5, paddingBottom: 5 }}
            rightIcon={<IconButton style={{ backgroundColor: muiTheme.palette[key], top: 0, marginTop: 10 }} />}
            leftIcon={!!palette[key] ? <IconButton style={{ marginTop: 0, padding: 0 }} onTouchTap={e => this.removeFromPalette(key)}><DeleteIcon /></IconButton> : null}
            insetChildren={!palette[key]}
            nestedItems={[<ColorPicker key={key} color={muiTheme.palette[key]} onColorChange={(color) => this.handleonColorChange(key, color)} />]}
        />
        )

        let sidebar =
            <ThemeSelector changeBaseTheme={this.handleBaseThemeChange} openDialog={this.handleDialogOpen} themeName={this.state.themeName}>
                <List>
                    <ListItem
                        primaryText="Palette"
                        leftIcon={<ImagePalette />}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={nestedItems}
                    />
                </List>
            </ThemeSelector>


        return (
            <Layout
                muiTheme={muiTheme}
                mainContent={<Components />}
                sidebar={sidebar}
            >
                <ThemeGeneratorDialog
                    open={this.state.dialogOpen}
                    handleOpen={this.handleDialogOpen}
                    handleClose={this.handleDialogClose}
                    palette={this.state.palette}
                    themeName={this.state.themeName}
                />
            </Layout>
        );
    }
}