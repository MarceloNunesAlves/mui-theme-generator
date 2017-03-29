import * as ColorTones from 'material-ui/styles/colors'

export class ColorHelper {
    static hexRegex = /^#?([a-f\d]{6})$/i;
    static rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    static colorToneRegex = /([^A\d]+)([A?\d]+)?/;

    static colorToneList = Object.keys(ColorTones).reduce((result, colorTone) => {
        var parseResult = parseColorTone(colorTone);
        var color = parseResult.color;
        var tone = parseResult.tone;
        var value = parseResult.value;

        result[color] = result[color] || {};
        result[color][tone] = value;

        return result;
    }, {});

    static reverseColorMap = Object.keys(ColorTones).reduce((result, key) => {
        let value = ColorTones[key];
        result[value] = key;
        return result;
    }, {});
}

export class Color {
    r;
    b;
    g;
    a;
    colorTone;

    constructor(value) {
        this.parse(value);
    }

    parse(value) {
        value = (value || "").trim();
        let result = false;
        if (!!value) {
            if (ColorHelper.colorToneRegex.test(value)) {
                result = this.setColorTone(value);
            }

            else if (ColorHelper.hexRegex.test(value)) {
                result = this.setHex(value);
            }

            if (ColorHelper.rgbaRegex.test(value)) {
                result = this.setRgba(value);
            }
        }

        if (!result)
            throw new Error("Not valid")
    }

    setAlpha(alpha) {
        this.a = alpha || this.a || 1;
    }

    setColorTone(key) {
        let value = ColorTones[key];
        return this.parse(value);
    }

    setHex(hex) {
        hex = ColorHelper.hexRegex.exec(hex)[1];
        let arrBuff = new ArrayBuffer(4);
        let vw = new DataView(arrBuff);
        vw.setUint32(0, parseInt(hex, 16), false);
        let arrByte = new Uint8Array(arrBuff);

        this.r = arrByte[1];
        this.g = arrByte[2];
        this.b = arrByte[3];

        this.getColorTone();
        return true;
    }

    setRgba(rbga) {
        let result = ColorHelper.rgbaRegex.exec(rbga);
        this.r = result[1];
        this.g = result[2];
        this.b = result[3];
        this.a = result[4] || 1;

        this.getColorTone();
        return true;
    }

    getRbga() {
        return `rbga(${this.r}, ${this.b}, ${this.g}, ${this.a})`;
    }

    getHex() {
        return "#" + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
    }

    getColorTone() {
        this.colorTone =
            ColorHelper.reverseColorMap[this.getRbga()] ||
            ColorHelper.reverseColorMap[this.getHex()] ||
            null;

        return this.colorTone;
    }
}