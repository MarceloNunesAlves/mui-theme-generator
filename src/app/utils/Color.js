import * as ColorTones from 'material-ui/styles/colors'

export class ColorHelper {
    static hexRegex = /^#?([a-f\d]{6})$/i;
    static rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    static colorToneRegex = /([^A\d]+)([A?\d]+)?/;

    static reverseColorMap = Object.keys(ColorTones).reduce((result, key) => {
        let value = ColorTones[key];
        result[value] = key;
        return result;
    }, {});
}

export class Color {
    r; b; g; a;

    constructor(value) {
        this.parse(value);
    }

    parse(value) {
        value = (value || "").trim();
        if (!!value) {
            if (ColorHelper.colorToneRegex.test(value)) {
                return this.parseColorTone(value);
            }

            else if (ColorHelper.hexRegex.test(value)) {
                return this.parseHex(value);
            }

            if (ColorHelper.rgbaRegex.test(value)) {
                return this.parseRgba(value);
            }
        }

        throw new Error("Not valid")
    }

    parseColorTone(key) {
        let value = ColorTones[key];
        this.parse(key);
    }

    parseHex(hex) {
        hex = ColorHelper.hexRegex.exec(hex)[1];
        let arrBuff = new ArrayBuffer(4);
        let vw = new DataView(arrBuff);
        vw.setUint32(0, parseInt(hex, 16), false);
        let arrByte = new Uint8Array(arrBuff);

        this.r = arrByte[1];
        this.g = arrByte[2];
        this.b = arrByte[3];
        this.a = 1;
    }

    parseRgba(rbga) {
        let result = ColorHelper.rgbaRegex.exec(rbga);
        this.r = result[1];
        this.g = result[2];
        this.b = result[3];
        this.a = result[4] || 1;
    }

    getRbga() {
        return `rbga(${this.r}, ${this.b}, ${this.g}, ${this.a})`;
    }

    getHex() {
        return "#" + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
    }

    getColorTone() {
        return ColorHelper.reverseColorMap[this.getRbga()]
            || ColorHelper.reverseColorMap[this.getHex()]
            || null;
    }
}