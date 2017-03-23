import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import ImagePalette from 'material-ui/svg-icons/image/palette';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import ColorPicker from './ColorPicker';


export default ({ themeName, changeBaseTheme, theme, palette, onColorChange, removeFromPalette }) => (
    <div style={{ margin: '30px' }}>
        <div style={{ display: 'flex' }}>
            <Tabs value={themeName} onChange={changeBaseTheme} style={{ flexGrow: 1 }} >
                <Tab label="light" value="light" />
                <Tab label="dark" value="dark" />
            </Tabs>
            <FlatButton
                label="Generate"
                style={{ height: 48 }}
            />
        </div>

        <List>
            <ListItem
                primaryText="Palette"
                leftIcon={<ImagePalette />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={
                    Object.keys(theme.palette).map((key, i) =>
                        <ListItem
                            key={key}
                            primaryText={key}
                            secondaryText={theme.palette[key]}
                            primaryTogglesNestedList={true}
                            innerDivStyle={{ paddingTop: 5, paddingBottom: 5 }}
                            rightIcon={<IconButton style={{ backgroundColor: theme.palette[key], top: 0, marginTop: 10 }} />}
                            leftIcon={!!palette[key] ? <IconButton style={{ padding: 0 }} onTouchTap={e => removeFromPalette(key)}><DeleteIcon /></IconButton> : null}
                            insetChildren={!palette[key]}
                            nestedItems={[<ColorPicker key={key} color={theme.palette[key]} onColorChange={(color) => onColorChange(key, color)} />]}
                        />
                    )
                }
            />
        </List>
    </div>
);
