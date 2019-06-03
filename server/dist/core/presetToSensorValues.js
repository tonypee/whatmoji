"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var Preset;
(function (Preset) {
    Preset["WINE"] = "WINE";
    Preset["BEER"] = "BEER";
    Preset["EGG"] = "EGG";
})(Preset = exports.Preset || (exports.Preset = {}));
exports.default = (_a = {},
    _a[Preset.WINE] = {
        temperature: {
            min: 1,
            max: 11
        },
        humidity: {
            min: 11,
            max: 111
        }
    },
    _a[Preset.BEER] = {
        temperature: {
            min: 2,
            max: 22
        },
        humidity: {
            min: 22,
            max: 222
        }
    },
    _a[Preset.EGG] = {
        temperature: {
            min: 3,
            max: 33
        },
        humidity: {
            min: 33,
            max: 333
        }
    },
    _a);
//# sourceMappingURL=presetToSensorValues.js.map