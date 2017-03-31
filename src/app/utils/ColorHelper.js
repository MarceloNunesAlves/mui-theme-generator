import * as ColorTones from 'material-ui/styles/colors'

export class ColorTone {
    color;
    tone;

    constructor(value) {
        let colorTone = ColorHelper.colorToneRegex.exec(value);
        var color = colorTone[1];
        var tone = colorTone[2];

        if (color && !tone) {
            tone = color;
            color = ' ';
        }
    }

    get() {
        return ((color || "") + (tone || "")).trim();
    }
}

export class RbgaColor {
    r;
    b;
    g;
    a;

    constructor(r, b, g, a = 1) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.a = a;
    }

    get() {
        return `rbga(${this.r}, ${this.b}, ${this.g}, ${this.a})`;
    }

    getHex() {
        return "#" + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
    }
}

export class ColorInfo {
    rbga;
    colorTone;

    constructor(value) {
        this.parse(value);
    }

    parse(value) {
        value = (value || "").trim();
        this.rbga = null;
        this.colorTone = null;

        if (!!value) {
            if (ColorHelper.colorToneRegex.test(value)) {
                value = ColorTones[value];
            }

            if (ColorHelper.hexRegex.test(value)) {
                return this.setHex(value);
            }

            if (ColorHelper.rgbaRegex.test(value)) {
                return this.setRgba(value);
            }
        }

        throw new Error("Not valid");
    }

    setAlpha(alpha) {
        this.rbga.a = alpha || this.rbga.a || 1;
        this.resetKey();
    }

    setHex(hex) {
        this.rbga = ColorHelper.parseHex(hex);
        this.resetKey();
    }

    setRgba(rbga) {
        this.rbga = ColorHelper.parseRbga(rbga);
        this.resetKey();
    }

    resetKey() {
        this.colorTone =
            ColorHelper.reverseColorMap[this.rbga.get()] ||
            ColorHelper.reverseColorMap[this.rbga.getHex()] ||
            null;
    }
}


export class ColorHelper {
    static hexRegex = /^#?([a-f\d]{6})$/i;
    static rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    static colorToneRegex = /^([^#][^A\d]+)([A?\d]+)?$/;

    colorToneList = Object.keys(ColorTones).reduce((result, value) => {
        var colorInfo = new ColorInfo(value);
        var color = colorInfo.color;
        var tone = colorInfo.tone;

        result[color] = result[color] || {};
        result[color][tone] = colorInfo;

        return result;
    }, {});

    reverseColorMap = Object.keys(ColorTones).reduce((result, key) => {
        var value = ColorTones[key];
        result[value] = new ColorTone(key);
        return result;
    }, {});

    static parseRbga(rbga) {
        let result = ColorHelper.rgbaRegex.exec(rbga);

        return new RbgaColor(result[1], result[2], result[3], result[4]);
    };

    static parseHex(hex) {
        hex = ColorHelper.hexRegex.exec(hex)[1];
        let arrBuff = new ArrayBuffer(4);
        let vw = new DataView(arrBuff);
        vw.setUint32(0, parseInt(hex, 16), false);
        let arrByte = new Uint8Array(arrBuff);

        return new RbgaColor(arrByte[1], arrByte[2], arrByte[3]);
    };
}