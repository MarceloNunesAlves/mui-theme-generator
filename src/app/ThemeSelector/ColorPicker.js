import React from 'react'
import ColorPalette from './ColorPalette'

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false
        };
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    onColorChange = (color) => {
        this.props.onColorChange && this.props.onColorChange(color);
    };

    render() {
        return (
            <div>
                <div onClick={this.handleClick}>
                    <div style={{
                        backgroundColor: this.props.color,
                        width: 20,
                        height: 20
                    }} />
                </div>
                {this.state.displayColorPicker ? <ColorPalette color={this.props.color} onColorChange={this.onColorChange} /> : null}
            </div>
        )
    }
}