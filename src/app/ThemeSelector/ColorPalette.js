import React from 'react'
import IconButton from 'material-ui/IconButton';
import * as ColorTones from 'material-ui/styles/colors'


const parseColorTone = (key) => {
    var test = /([^A\d]+)([A?\d]+)?/.exec(key);
    var color = test[1];
    var tone = test[2];

    if (color && !tone) {
        tone = color;
        color = '';
    }

    return { color, tone, key, value: ColorTones[key] };
}

const colorToneList = Object.keys(ColorTones).reduce((result, colorTone) => {
    var parseResult = parseColorTone(colorTone);
    var color = parseResult.color;
    var tone = parseResult.tone;
    var value = parseResult.value;

    result[color] = result[color] || {};
    result[color][tone] = value;

    return result;
}, {});

export default class ColorPalette extends React.Component {

    constructor(props) {
        super(props);

        var initColorTone = Object.keys(ColorTones).filter(ct => ColorTones[ct] == props.color)[0];

        this.state = {
            initColor: props.color,
            colorTone: parseColorTone(initColorTone || 'indigo500')
        }
    }

    changeColorTone(color, tone) {
        var newColorTone = parseColorTone(color + tone);
        this.setState({
            colorTone: newColorTone
        });

        this.props.onColorChange && this.props.onColorChange(newColorTone.value);
    }

    generateColorSelector() {
        var tone = this.state.colorTone.tone;

        return (
            <div style={{ display: 'flex' }}>
                {
                    Object.keys(colorToneList).map(color =>
                        <IconButton
                            key={color}
                            style={{
                                display: 'flex',
                                backgroundColor: colorToneList[color]['500'] || '#c3c3c3',
                                width: 20,
                                height: 20
                            }}
                            onClick={() => this.changeColorTone(color, tone)}
                            tooltip={color}
                        />
                    )
                }
            </div>
        );
    }

    generateToneSelector() {
        var color = this.state.colorTone.color;

        return (
            <div style={{ display: 'flex' }}>
                {
                    Object.keys(colorToneList[color]).map(tone =>
                        <IconButton
                            key={tone}
                            style={{
                                display: 'flex',
                                flexGrow: 1,
                                backgroundColor: colorToneList[color][tone],
                                color: '#c3c3c3',
                                width: 20,
                                height: 50,
                                cursor: 'pointer',
                                zIndex: 0
                            }}
                            onClick={() => this.changeColorTone(color, tone)}
                            tooltip={tone}
                        />
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', backgroundColor: '#eee', right: '50%' }}>
                {this.generateColorSelector()}
                {this.generateToneSelector()}
            </div>
        );
    }
}