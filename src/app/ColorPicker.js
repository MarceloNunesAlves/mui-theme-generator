import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import ColorHelper from 'react-color/lib/helpers/color'

export class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            color: ColorHelper.toState(props.color)
        };
    }

    colorToString = (color) => {
        if (color.rgb && color.rgb.a !== 1)
            return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`

        return color.hex;
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color })
        this.props.onColorChange && this.props.onColorChange(this.colorToString(color));
    };


    render() {

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: this.colorToString(this.state.color),
                },
                swatch: {
                    padding: '5px',
                    background: 'rgba(255,255,255,.1)',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    left: '24%'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker color={this.state.color.rgb} onChange={this.handleChange} />
                </div> : null}

            </div>
        )
    }
}