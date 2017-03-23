import React from 'react'
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import * as ColorTones from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'


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
        },
        alpha: {
            display: 'flex',
            flexDirection: 'row'
        },
        alphaText: {
            flex: 10,
            textAlign: 'right',
            margin: 'auto'
        },
        alphaValue: {
            flex: 90
        },
        alphaSlider: {
            margin: '10px 0'
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

export const rgbToHex = (r, g, b) => {
    var matches = r.match(/\d+/g);
    if (matches.length > 2) {
        r = matches[0];
        g = matches[1];
        b = matches[2];
    }

    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('');
};


export default class ColorPalette extends React.Component {

    constructor(props) {
        super(props);

        var key = Object.keys(ColorTones).filter(ct => ColorTones[ct] == props.color);
        var colorTone = parseColorTone(key);
        this.state = {
            initColor: props.color,
            color: colorTone && colorTone.color,
            tone: colorTone && colorTone.tone,
            alpha: 1
        }
    }

    changeColorTone(color = this.state.color, tone = this.state.tone, alpha = this.state.alpha) {
        if (!!color) {
            this.setState({
                color, tone, alpha
            });
            var newColorTone = colorToneList[color][tone];
            if (!!newColorTone && this.props.onColorChange) {
                var newColor = alpha != 1 ? fade(newColorTone, alpha) : newColorTone;
                this.props.onColorChange(newColor);
            }
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

    generateAlphaSelector = () => (
        <Slider
            min={0}
            max={1}
            step={0.01}
            value={this.state.alpha}
            onChange={(e, value) => this.changeColorTone(undefined, undefined, value)}
            style={styles.container.alphaValue}
            sliderStyle={styles.container.alphaSlider}
        />
    );

    render() {
        return (
            <div style={styles.container.main}>
                {this.generateColorSelector()}
                {this.state.color ? this.generateToneSelector() : null}
                <div style={styles.container.alpha}>
                    {this.state.color ? this.generateAlphaSelector() : null}
                    <div style={styles.container.alphaText}>{this.state.alpha}</div>
                </div>
            </div>
        );
    }
}