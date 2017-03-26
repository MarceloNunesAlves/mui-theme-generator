import React from 'react';

import { List, ListItem } from 'material-ui/List';
import PaletteIcon from 'material-ui/svg-icons/image/palette';
import ComponentIcon from 'material-ui/svg-icons/action/view-quilt';

import { createAttributes } from '../ThemeSelector/Attribute';


export const SideBar = ({ overwrites, palette, components, addToOverwrites, removeFromOverwrites }) => {
    let paletteItems = createAttributes(palette, overwrites, addToOverwrites, removeFromOverwrites, ["palette"]);
    let componentItems = createAttributes(components, overwrites, addToOverwrites, removeFromOverwrites);

    return (
        <div>
            <List>
                <ListItem
                    primaryText="Palette"
                    leftIcon={<PaletteIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={paletteItems}
                />
                <ListItem
                    primaryText="Components"
                    leftIcon={<ComponentIcon />}
                    primaryTogglesNestedList={true}
                    nestedItems={componentItems}
                />
            </List>
        </div>
    );
};