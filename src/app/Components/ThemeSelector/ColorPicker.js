import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import { ColorInfo, ColorHelper } from '../../utils/ColorHelper'


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
            width: 15,
            height: 15,
            padding: 0,
            flexGrow: 1
        },
        tone: {
            color: '#c3c3c3',
            width: 15,
            height: 20,
            padding: 0,
            flexGrow: 1
        }
    }
};

// const parseColorTone = (key) => {
//     if (!key || !ColorTones[key])
//         return null;

//     var test = /([^A\d]+)([A?\d]+)?/.exec(key);
//     var color = test[1];
//     var tone = test[2];

//     if (color && !tone) {
//         tone = color;
//         color = ' ';
//     }

//     return { color, tone, key, value: ColorTones[key] };
// }

// const colorToneList = Object.keys(ColorTones).reduce((result, colorTone) => {
//     var parseResult = parseColorTone(colorTone);
//     var color = parseResult.color;
//     var tone = parseResult.tone;
//     var value = parseResult.value;

//     result[color] = result[color] || {};
//     result[color][tone] = value;

//     return result;
// }, {});


// export const reverseColorMap = Object.keys(ColorTones).reduce((result, key) => {
//     let value = ColorTones[key];
//     result[value] = key;
//     return result;
// }, {});


// const rgbaToHex = (value) => {
//     if (/#/.test(value))
//         return value;

//     let matches = value.match(/[\d\.]+/g);

//     if (matches.length < 3)
//         return {};

//     let r = matches[0];
//     let g = matches[1];
//     let b = matches[2];
//     let a = matches[3];

//     return {
//         color: '#' + [r, g, b].map(x => {
//             const hex = Number(x).toString(16)
//             return hex.length === 1 ? '0' + hex : hex
//         }).join(''),
//         alpha: a
//     };
// };

// export const parseColor = (value) => {
//     let colorTone = null;
//     let alpha = 1;

//     if (value) {
//         let reverse = reverseColorMap[value];
//         if (reverse) {
//             colorTone = parseColorTone(reverse);
//         }
//         else {
//             let rbga = rgbaToHex(value);
//             if (rbga.color) {
//                 colorTone = parseColor(rbga.color).colorTone;
//                 alpha = rbga.alpha || alpha;
//             }
//         }
//     }

//     return {
//         colorTone, alpha
//     };
// }


export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        let colorInfo = new ColorInfo(props.color);

        this.state = {
            initColor: props.color,
            colorInfo
        }
    }

    changeColor = (color) => {
        let { colorInfo } = this.state;
        colorInfo.parse(color + colorInfo.colorTone && colorInfo.colorTone.tone);
        this.propagateColorChange(colorInfo);
    }

    changeTone = (color, tone) => {
        let { colorInfo } = this.state;
        colorInfo.parse(color + tone);
        this.propagateColorChange(colorInfo);
    }

    changeAlpha = (alpha) => {
        let { colorInfo } = this.state;
        colorInfo.setAlpha(alpha);
        this.propagateColorChange(colorInfo);
    }

    propagateColorChange = (colorInfo) => {
        this.setState({ colorInfo });
        this.props.onColorChange(colorInfo);
    }

    generateColorSelector = () => {
        return (
            <div style={{ ...styles.container.color, height: styles.button.color.height * multiplier }} >
                {
                    Object.keys(ColorHelper.colorToneList).map(color =>
                        <IconButton
                            key={color}
                            style={{
                                ...styles.button.color,
                                backgroundColor: colorToneList[color][Object.keys(ColorHelper.colorToneList[color])[5]],
                                height: (color === this.state.color ? multiplier : 1) * styles.button.color.height
                            }}
                            onClick={() => this.changeColor(color)}
                            tooltip={color}
                            tooltipPosition="top-center"
                        />
                    )
                }
            </div>
        );
    }

    generateToneSelector = () => {
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
                            onClick={() => this.changeTone(color, tone)}
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
            onChange={(e, value) => this.changeAlpha(value)}
            onDragStop={e => this.propagateColorChange()}
            style={styles.container.alphaValue}
            sliderStyle={styles.container.alphaSlider}
        />
    );

    render() {
        return (
            <div style={styles.container.main}>
                {this.generateColorSelector()}
                {this.state.color ? this.generateToneSelector() : null}
                {this.state.color ?
                    <div style={styles.container.alpha}>
                        {this.generateAlphaSelector()}
                        <div style={styles.container.alphaText}>{this.state.alpha}</div>
                    </div> : null
                }
            </div>
        );
    }
}