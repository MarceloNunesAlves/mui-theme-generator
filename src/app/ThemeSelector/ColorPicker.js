import React from 'react'
import IconButton from 'material-ui/IconButton';
import * as ColorTones from 'material-ui/styles/colors'


const multiplier = 1.5;

const styles = {
    container: {
        main: {
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            padding: '5px 14px',
            marginLeft: 32,
            backgroundColor: 'rgba(125, 125, 125, 0.12)'
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
            // display: 'flex',
            width: 15,
            height: 15,
            padding: 0,
            flexGrow: 1
        },
        tone: {
            // display: 'flex',
            color: '#c3c3c3',
            width: 15,
            height: 20,
            padding: 0,
            flexGrow: 1
        }
    }
};

export const parseColorTone = (key) => {
    if (!ColorTones[key])
        return null;

    var test = /([^A\d]+)([A?\d]+)?/.exec(key);
    var color = test[1];
    var tone = test[2];

    if (color && !tone) {
        tone = color;
        color = ' ';
    }

    return { color, tone, key, value: ColorTones[key] };
}

export const colorToneList = Object.keys(ColorTones).reduce((result, colorTone) => {
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

        var key = Object.keys(ColorTones).filter(ct => ColorTones[ct] == props.color);
        var colorTone = parseColorTone(key);
        this.state = {
            initColor: props.color,
            color: colorTone && colorTone.color,
            tone: colorTone && colorTone.tone
        }
    }

    changeColorTone(color, tone = this.state.tone) {
        if (!!color) {
            this.setState({
                color, tone
            });
            var newColorTone = colorToneList[color][tone];
            newColorTone && this.props.onColorChange && this.props.onColorChange(newColorTone);
        }
    }

    generateColorSelector() {
        return (
            <div style={{ ...styles.container.color, height: styles.button.color.height * multiplier }} >
                {
                    Object.keys(colorToneList).map(color =>
                        <IconButton
                            key={color}
                            style={{
                                ...styles.button.color,
                                backgroundColor: colorToneList[color][Object.keys(colorToneList[color])[5]],
                                height: (color === this.state.color ? multiplier : 1) * styles.button.color.height
                            }}
                            onClick={() => this.changeColorTone(color)}
                            tooltip={color}
                            tooltipPosition="top-center"
                        />
                    )
                }
            </div>
        );
    }

    generateToneSelector() {
        var color = this.state.color;

        return (
            <div style={{ ...styles.container.tone, height: styles.button.tone.height * multiplier }}>
                {
                    Object.keys(colorToneList[color]).map(tone =>
                        <IconButton
                            key={tone}
                            style={{
                                ...styles.button.tone,
                                backgroundColor: colorToneList[color][tone],
                                height: (tone === this.state.tone ? multiplier : 1) * styles.button.tone.height
                            }}
                            onClick={() => this.changeColorTone(color, tone)}
                            tooltip={tone}
                            tooltipPosition="bottom-center"
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
                {this.state.color ? this.generateToneSelector() : null}
            </div>
        );
    }
}