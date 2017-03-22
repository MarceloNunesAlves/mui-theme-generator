import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import ColorPicker from './ColorPicker';


export default ({ initialTheme, changeBaseTheme, theme, onColorChange }) => (
    <div style={{ margin: '30px' }}>
        <Tabs value={initialTheme} onChange={changeBaseTheme} >
            <Tab label="light" value="light" />
            <Tab label="dark" value="dark" />
        </Tabs>

        <List>
            <Subheader>Nested List Items</Subheader>
            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
            <ListItem
                primaryText="Inbox"
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true}
                nestedItems={[
                    <ListItem
                        key={1}
                        primaryText="Starred"
                        leftIcon={<ActionGrade />}
                    />,
                    <ListItem
                        key={2}
                        primaryText="Sent Mail"
                        leftIcon={<ContentSend />}
                        disabled={true}
                        nestedItems={[
                            <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                        ]}
                    />,
                    <ListItem
                        key={3}
                        primaryText="Inbox"
                        leftIcon={<ContentInbox />}
                        nestedItems={[
                            <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                        ]}
                    />,
                ]}
            />
        </List>

        <Card>
            <CardHeader title="Theme" actAsExpander={true} showExpandableButton={true} />
            <CardText expandable={true}>
                <table style={{ marginTop: 20, fontSize: 16, borderSpacing: 10 }}>
                    <thead>
                        <tr style={{ fontWeight: 500 }}>
                            <td>Key</td>
                            <td>Base Theme</td>
                            <td>Overwrites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(theme.palette).map(key =>
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <ColorPicker color={theme.palette[key]} />
                                    </td>
                                    <td>
                                        <ColorPicker color={theme.palette[key]} onColorChange={(color) => onColorChange(key, color)} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </CardText>
            <CardActions>
                <FlatButton label="Download" />
            </CardActions>
        </Card>
    </div>
);
