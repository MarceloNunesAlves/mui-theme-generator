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

const multiplier = 1.5;

const styles = {
    container: {
        main: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(128, 128, 128, 0.28)',
            right: '50%',
            padding: '8px 15px'
        },
        color: {
            display: 'flex',
            alignItems: 'flex-end'
        },
        tone: {
            display: 'flex'
        }
    },
    button: {
        color: {
            display: 'flex',
            width: 15,
            height: 15,
            padding: 0
        },
        tone: {
            display: 'flex',
            color: '#c3c3c3',
            width: 15,
            height: 20,
            padding: 0,
            zIndex: 0,
            flexGrow: 1
        }
    }
}

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
        var selectedColor = this.state.colorTone.color;
        var tone = this.state.colorTone.tone;

        return (
            <div style={{ ...styles.container.color, height: styles.button.color.height * multiplier }} >
                {
                    Object.keys(colorToneList).map(color =>
                        <IconButton
                            key={color}
                            style={{
                                ...styles.button.color,
                                backgroundColor: colorToneList[color]['500'] || '#c3c3c3',
                                height: (selectedColor === color ? multiplier : 1) * styles.button.color.height
                            }}
                            onClick={() => this.changeColorTone(color, tone)}
                            hoveredStyle={{ height: styles.button.color.height * multiplier }}
                            tooltip={color}
                        />
                    )
                }
            </div>
        );
    }

    generateToneSelector() {
        var selectedTone = this.state.colorTone.tone;
        var color = this.state.colorTone.color;

        return (
            <div style={{ ...styles.container.tone, height: styles.button.tone.height * multiplier }}>
                {
                    Object.keys(colorToneList[color]).map(tone =>
                        <IconButton
                            key={tone}
                            style={{
                                ...styles.button.tone,
                                backgroundColor: colorToneList[color][tone],
                                height: (selectedTone === tone ? multiplier : 1) * styles.button.tone.height
                            }}
                            onClick={() => this.changeColorTone(color, tone)}
                            hoveredStyle={{ height: styles.button.tone.height * multiplier }}
                            tooltip={tone}
                        />
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div style={styles.container.main}>
                {this.generateColorSelector()}
                {this.generateToneSelector()}
            </div>
        );
    }
}