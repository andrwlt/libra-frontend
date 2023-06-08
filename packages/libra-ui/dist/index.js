"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _tagged_template_literal(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _templateObject() {
    var data = _tagged_template_literal([
        "\n  margin: 32px 0;\n  width: 300px;\n  height: 300px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject1() {
    var data = _tagged_template_literal([
        "\n  width: 100%;\n\n  .product-name-skeleton {\n    .ant-skeleton-title {\n      height: 20px !important;\n      margin-bottom: 4px;\n      margin-top: 30px !important;\n      width: 60%;\n    }\n  }\n\n  .product-price-skeleton {\n    .ant-skeleton-title {\n      height: 32px !important;\n      margin-bottom: 5px;\n      margin-top: 15px;\n    }\n  }\n\n  .product-description-skeleton {\n    .ant-skeleton-title {\n      height: 18px !important;\n      margin-bottom: 0;\n      margin-top: 5px;\n    }\n  }\n\n  .product-image-skeleton {\n    .ant-skeleton-avatar {\n      width: 300px;\n      height: 300px;\n    }\n  }\n"
    ]);
    _templateObject1 = function _templateObject1() {
        return data;
    };
    return data;
}
function _templateObject2() {
    var data = _tagged_template_literal([
        "\n  font-size: 12px;\n  margin-right: auto;\n  color: rgba(0, 0, 0, 0.5) !important;\n\n  &:hover {\n    color: rgba(0, 0, 0, 0.8) !important;\n  }\n"
    ]);
    _templateObject2 = function _templateObject2() {
        return data;
    };
    return data;
}
function _templateObject3() {
    var data = _tagged_template_literal([
        "\n  width: 380px;\n  max-width: 380px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n"
    ]);
    _templateObject3 = function _templateObject3() {
        return data;
    };
    return data;
}
function _templateObject4() {
    var data = _tagged_template_literal([
        "\n  height: 56px;\n  position: fixed;\n  top: 0;\n"
    ]);
    _templateObject4 = function _templateObject4() {
        return data;
    };
    return data;
}
function _templateObject5() {
    var data = _tagged_template_literal([
        "\n  height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding-left: 24px;\n\n  .brand-skeleton {\n    .ant-skeleton-title {\n      width: 50px;\n      height: 20px !important;\n      margin-left: 0px;\n    }\n  }\n"
    ]);
    _templateObject5 = function _templateObject5() {
        return data;
    };
    return data;
}
function _templateObject6() {
    var data = _tagged_template_literal([
        "\n  width: 100%;\n  height: 100%;\n  min-height: 100%;\n  background-color: #fff;\n  display: block;\n"
    ]);
    _templateObject6 = function _templateObject6() {
        return data;
    };
    return data;
}
function _templateObject7() {
    var data = _tagged_template_literal([
        "\n  display: flex;\n  justify-content: center;\n\n  &::before {\n    animation-fill-mode: both;\n    background: #ffffff;\n    content: ' ';\n    height: 100%;\n    position: fixed;\n    right: 0;\n    top: 0;\n    transform-origin: right;\n    width: 50%;\n    box-shadow: 15px 0 30px 0 rgba(0, 0, 0, 0.18);\n  }\n"
    ]);
    _templateObject7 = function _templateObject7() {
        return data;
    };
    return data;
}
function _templateObject8() {
    var data = _tagged_template_literal([
        "\n  height: 678px;\n  max-width: 920px;\n  width: 100%;\n  transform: translateY(max(48px, calc(50vh - 55%)));\n"
    ]);
    _templateObject8 = function _templateObject8() {
        return data;
    };
    return data;
}
function _templateObject9() {
    var data = _tagged_template_literal([
        "\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  z-index: 1000;\n  align-items: center;\n"
    ]);
    _templateObject9 = function _templateObject9() {
        return data;
    };
    return data;
}
function _templateObject10() {
    var data = _tagged_template_literal([
        "\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  z-index: 1000;\n  align-items: center;\n"
    ]);
    _templateObject10 = function _templateObject10() {
        return data;
    };
    return data;
}
function _templateObject11() {
    var data = _tagged_template_literal([
        "\n  height: calc(100vh - 56px);\n  top: 56px;\n\n  .ant-space {\n    margin-bottom: 100px;\n  }\n"
    ]);
    _templateObject11 = function _templateObject11() {
        return data;
    };
    return data;
}
function _templateObject12() {
    var data = _tagged_template_literal([
        "\n  .ant-spin-spinning {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n"
    ]);
    _templateObject12 = function _templateObject12() {
        return data;
    };
    return data;
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = function(cb, mod) {
    return function __require() {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
            exports: {}
        }).exports, mod), mod.exports;
    };
};
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// ../../node_modules/classnames/index.js
var require_classnames = __commonJS({
    "../../node_modules/classnames/index.js": function(exports, module2) {
        (function() {
            "use strict";
            var hasOwn = {}.hasOwnProperty;
            var nativeCodeString = "[native code]";
            function classNames2() {
                var classes = [];
                for(var i = 0; i < arguments.length; i++){
                    var arg = arguments[i];
                    if (!arg) continue;
                    var argType = typeof arg === "undefined" ? "undefined" : _type_of(arg);
                    if (argType === "string" || argType === "number") {
                        classes.push(arg);
                    } else if (Array.isArray(arg)) {
                        if (arg.length) {
                            var inner = classNames2.apply(null, arg);
                            if (inner) {
                                classes.push(inner);
                            }
                        }
                    } else if (argType === "object") {
                        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
                            classes.push(arg.toString());
                            continue;
                        }
                        for(var key in arg){
                            if (hasOwn.call(arg, key) && arg[key]) {
                                classes.push(key);
                            }
                        }
                    }
                }
                return classes.join(" ");
            }
            if (typeof module2 !== "undefined" && module2.exports) {
                classNames2.default = classNames2;
                module2.exports = classNames2;
            } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
                define("classnames", [], function() {
                    return classNames2;
                });
            } else {
                window.classNames = classNames2;
            }
        })();
    }
});
// ../../node_modules/mersenne-twister/src/mersenne-twister.js
var require_mersenne_twister = __commonJS({
    "../../node_modules/mersenne-twister/src/mersenne-twister.js": function(exports, module2) {
        var MersenneTwister = function MersenneTwister(seed) {
            if (seed == void 0) {
                seed = /* @__PURE__ */ new Date().getTime();
            }
            this.N = 624;
            this.M = 397;
            this.MATRIX_A = 2567483615;
            this.UPPER_MASK = 2147483648;
            this.LOWER_MASK = 2147483647;
            this.mt = new Array(this.N);
            this.mti = this.N + 1;
            if (seed.constructor == Array) {
                this.init_by_array(seed, seed.length);
            } else {
                this.init_seed(seed);
            }
        };
        MersenneTwister.prototype.init_seed = function(s) {
            this.mt[0] = s >>> 0;
            for(this.mti = 1; this.mti < this.N; this.mti++){
                var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
                this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
                this.mt[this.mti] >>>= 0;
            }
        };
        MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
            var i, j, k;
            this.init_seed(19650218);
            i = 1;
            j = 0;
            k = this.N > key_length ? this.N : key_length;
            for(; k; k--){
                var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
                this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
                this.mt[i] >>>= 0;
                i++;
                j++;
                if (i >= this.N) {
                    this.mt[0] = this.mt[this.N - 1];
                    i = 1;
                }
                if (j >= key_length) j = 0;
            }
            for(k = this.N - 1; k; k--){
                var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
                this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
                this.mt[i] >>>= 0;
                i++;
                if (i >= this.N) {
                    this.mt[0] = this.mt[this.N - 1];
                    i = 1;
                }
            }
            this.mt[0] = 2147483648;
        };
        MersenneTwister.prototype.random_int = function() {
            var y;
            var mag01 = new Array(0, this.MATRIX_A);
            if (this.mti >= this.N) {
                var kk;
                if (this.mti == this.N + 1) this.init_seed(5489);
                for(kk = 0; kk < this.N - this.M; kk++){
                    y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
                    this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
                }
                for(; kk < this.N - 1; kk++){
                    y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
                    this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
                }
                y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
                this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
                this.mti = 0;
            }
            y = this.mt[this.mti++];
            y ^= y >>> 11;
            y ^= y << 7 & 2636928640;
            y ^= y << 15 & 4022730752;
            y ^= y >>> 18;
            return y >>> 0;
        };
        MersenneTwister.prototype.random_int31 = function() {
            return this.random_int() >>> 1;
        };
        MersenneTwister.prototype.random_incl = function() {
            return this.random_int() * (1 / 4294967295);
        };
        MersenneTwister.prototype.random = function() {
            return this.random_int() * (1 / 4294967296);
        };
        MersenneTwister.prototype.random_excl = function() {
            return (this.random_int() + 0.5) * (1 / 4294967296);
        };
        MersenneTwister.prototype.random_long = function() {
            var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
            return (a * 67108864 + b) * (1 / 9007199254740992);
        };
        module2.exports = MersenneTwister;
    }
});
// ../../node_modules/react-jazzicon/dist/colorUtils.js
var require_colorUtils = __commonJS({
    "../../node_modules/react-jazzicon/dist/colorUtils.js": function(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.HSLToHex = exports.hexToHSL = exports.colorRotate = void 0;
        var colorRotate = function colorRotate(hex, degrees) {
            var hsl = (0, exports.hexToHSL)(hex);
            var hue = hsl.h;
            hue = (hue + degrees) % 360;
            hue = hue < 0 ? 360 + hue : hue;
            hsl.h = hue;
            return (0, exports.HSLToHex)(hsl);
        };
        exports.colorRotate = colorRotate;
        var hexToHSL = function hexToHSL(hex) {
            var rStr = "0x" + hex[1] + hex[2];
            var gStr = "0x" + hex[3] + hex[4];
            var bStr = "0x" + hex[5] + hex[6];
            var r = parseInt(rStr) / 255;
            var g = parseInt(gStr) / 255;
            var b = parseInt(bStr) / 255;
            var cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
            if (delta == 0) h = 0;
            else if (cmax == r) h = (g - b) / delta % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);
            return {
                h: h,
                s: s,
                l: l
            };
        };
        exports.hexToHSL = hexToHSL;
        var HSLToHex = function HSLToHex(hsl) {
            var h = hsl.h, s = hsl.s, l = hsl.l;
            s /= 100;
            l /= 100;
            var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
            if (0 <= h && h < 60) {
                r = c;
                g = x;
                b = 0;
            } else if (60 <= h && h < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (120 <= h && h < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (180 <= h && h < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (240 <= h && h < 300) {
                r = x;
                g = 0;
                b = c;
            } else if (300 <= h && h < 360) {
                r = c;
                g = 0;
                b = x;
            }
            var rStr = Math.round((r + m) * 255).toString(16);
            var gStr = Math.round((g + m) * 255).toString(16);
            var bStr = Math.round((b + m) * 255).toString(16);
            if (rStr.length == 1) rStr = "0" + rStr;
            if (gStr.length == 1) gStr = "0" + gStr;
            if (bStr.length == 1) bStr = "0" + bStr;
            return "#" + rStr + gStr + bStr;
        };
        exports.HSLToHex = HSLToHex;
    }
});
// ../../node_modules/react-jazzicon/dist/colors.js
var require_colors = __commonJS({
    "../../node_modules/react-jazzicon/dist/colors.js": function(exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = Object.freeze([
            "#01888c",
            "#fc7500",
            "#034f5d",
            "#f73f01",
            "#fc1960",
            "#c7144c",
            "#f3c100",
            "#1598f2",
            "#2465e1",
            "#f19e02"
        ]);
    }
});
// ../../node_modules/react-jazzicon/dist/Paper.js
var require_Paper = __commonJS({
    "../../node_modules/react-jazzicon/dist/Paper.js": function(exports) {
        "use strict";
        var __assign = exports && exports.__assign || function() {
            __assign = Object.assign || function(t2) {
                for(var s, i = 1, n = arguments.length; i < n; i++){
                    s = arguments[i];
                    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p];
                }
                return t2;
            };
            return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var jsx_runtime_1 = require("react/jsx-runtime");
        var styles = {
            borderRadius: "50px",
            display: "inline-block",
            margin: 0,
            overflow: "hidden",
            padding: 0
        };
        var Paper = function Paper(_a) {
            var children = _a.children, color = _a.color, diameter = _a.diameter, styleOverrides = _a.style;
            return (0, jsx_runtime_1.jsx)("div", __assign({
                className: "paper",
                style: __assign(__assign(__assign({}, styles), {
                    backgroundColor: color,
                    height: diameter,
                    width: diameter
                }), styleOverrides)
            }, {
                children: children
            }), void 0);
        };
        exports.default = Paper;
    }
});
// ../../node_modules/react-jazzicon/dist/Jazzicon.js
var require_Jazzicon = __commonJS({
    "../../node_modules/react-jazzicon/dist/Jazzicon.js": function(exports) {
        "use strict";
        var __extends = exports && exports.__extends || function() {
            var extendStatics = function extendStatics1(d, b) {
                extendStatics = Object.setPrototypeOf || _instanceof({
                    __proto__: []
                }, Array) && function(d2, b2) {
                    d2.__proto__ = b2;
                } || function(d2, b2) {
                    for(var p in b2)if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
                };
                return extendStatics(d, b);
            };
            return function(d, b) {
                var __ = function __() {
                    this.constructor = d;
                };
                if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        }();
        var __assign = exports && exports.__assign || function() {
            __assign = Object.assign || function(t2) {
                for(var s, i = 1, n = arguments.length; i < n; i++){
                    s = arguments[i];
                    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p];
                }
                return t2;
            };
            return __assign.apply(this, arguments);
        };
        var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
                enumerable: true,
                get: function get() {
                    return m[k];
                }
            });
        } : function(o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
        });
        var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
            Object.defineProperty(o, "default", {
                enumerable: true,
                value: v
            });
        } : function(o, v) {
            o["default"] = v;
        });
        var __importStar = exports && exports.__importStar || function(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) {
                for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
            }
            __setModuleDefault(result, mod);
            return result;
        };
        var __importDefault = exports && exports.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                "default": mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var jsx_runtime_1 = require("react/jsx-runtime");
        var React5 = __importStar(require("react"));
        var mersenne_twister_1 = __importDefault(require_mersenne_twister());
        var colorUtils_1 = require_colorUtils();
        var colors_1 = __importDefault(require_colors());
        var Paper_1 = __importDefault(require_Paper());
        var shapeCount = 4;
        var svgns = "http://www.w3.org/2000/svg";
        var wobble = 30;
        var defaultDiameter = 24;
        var Jazzicon2 = /** @class */ function(_super) {
            var Jazzicon3 = function Jazzicon3() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.genColor = function(colors) {
                    var rand = _this.generator.random();
                    var idx = Math.floor(colors.length * _this.generator.random());
                    var color = colors.splice(idx, 1)[0];
                    return color;
                };
                _this.hueShift = function(colors, generator) {
                    var amount = generator.random() * 30 - wobble / 2;
                    var rotate = function rotate(hex) {
                        return (0, colorUtils_1.colorRotate)(hex, amount);
                    };
                    return colors.map(rotate);
                };
                _this.genShape = function(remainingColors, diameter, i, total) {
                    var center = diameter / 2;
                    var firstRot = _this.generator.random();
                    var angle = Math.PI * 2 * firstRot;
                    var velocity = diameter / total * _this.generator.random() + i * diameter / total;
                    var tx = Math.cos(angle) * velocity;
                    var ty = Math.sin(angle) * velocity;
                    var translate = "translate(" + tx + " " + ty + ")";
                    var secondRot = _this.generator.random();
                    var rot = firstRot * 360 + secondRot * 180;
                    var rotate = "rotate(" + rot.toFixed(1) + " " + center + " " + center + ")";
                    var transform = translate + " " + rotate;
                    var fill = _this.genColor(remainingColors);
                    return (0, jsx_runtime_1.jsx)("rect", {
                        x: "0",
                        y: "0",
                        rx: "0",
                        ry: "0",
                        height: diameter,
                        width: diameter,
                        transform: transform,
                        fill: fill
                    }, i);
                };
                return _this;
            };
            __extends(Jazzicon3, _super);
            Jazzicon3.prototype.render = function() {
                var _this = this;
                var _a = this.props, _b = _a.diameter, diameter = _b === void 0 ? defaultDiameter : _b, _c = _a.paperStyles, paperStyles = _c === void 0 ? {} : _c, seed = _a.seed, _d = _a.svgStyles, svgStyles = _d === void 0 ? {} : _d;
                this.generator = new mersenne_twister_1.default(seed);
                var remainingColors = this.hueShift(colors_1.default.slice(), this.generator);
                var shapesArr = Array(shapeCount).fill(void 0);
                return (0, jsx_runtime_1.jsx)(Paper_1.default, __assign({
                    color: this.genColor(remainingColors),
                    diameter: diameter,
                    style: paperStyles
                }, {
                    children: (0, jsx_runtime_1.jsx)("svg", __assign({
                        xmlns: svgns,
                        x: "0",
                        y: "0",
                        height: diameter,
                        width: diameter,
                        style: svgStyles
                    }, {
                        children: shapesArr.map(function(s, i) {
                            return _this.genShape(remainingColors, diameter, i, shapeCount - 1);
                        })
                    }), void 0)
                }), void 0);
            };
            return Jazzicon3;
        }(React5.PureComponent);
        exports.default = Jazzicon2;
    }
});
// ../../node_modules/react-jazzicon/dist/jsNumberForAddress.js
var require_jsNumberForAddress = __commonJS({
    "../../node_modules/react-jazzicon/dist/jsNumberForAddress.js": function(exports) {
        "use strict";
        var jsNumberForAddress2 = function jsNumberForAddress2(address) {
            var addr = address.slice(2, 10);
            var seed = parseInt(addr, 16);
            return seed;
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = jsNumberForAddress2;
    }
});
// ../../node_modules/react-jazzicon/dist/index.js
var require_dist = __commonJS({
    "../../node_modules/react-jazzicon/dist/index.js": function(exports) {
        "use strict";
        var __importDefault = exports && exports.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : {
                "default": mod
            };
        };
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.jsNumberForAddress = exports.default = void 0;
        var Jazzicon_1 = require_Jazzicon();
        Object.defineProperty(exports, "default", {
            enumerable: true,
            get: function get() {
                return __importDefault(Jazzicon_1).default;
            }
        });
        var jsNumberForAddress_1 = require_jsNumberForAddress();
        Object.defineProperty(exports, "jsNumberForAddress", {
            enumerable: true,
            get: function get() {
                return __importDefault(jsNumberForAddress_1).default;
            }
        });
    }
});
// src/index.tsx
var src_exports = {};
__export(src_exports, {
    AccountOption: function() {
        return AccountInfo;
    },
    CheckoutComponent: function() {
        return Checkout_default;
    },
    ContactInformation: function() {
        return ContactInformation_default;
    },
    EXTENSIONS: function() {
        return EXTENSIONS;
    },
    EXTENSION_IDS: function() {
        return EXTENSION_IDS;
    },
    Loading: function() {
        return Loading_default;
    },
    extensionAPI: function() {
        return extension_default;
    },
    getAssetMetadata: function() {
        return getAssetMetadata;
    },
    getExtensionId: function() {
        return getExtensionId;
    },
    getNetwork: function() {
        return getNetwork;
    },
    getNetworkAssets: function() {
        return getNetworkAssets;
    },
    getWalletNetworks: function() {
        return getWalletNetworks;
    },
    priceFormatHelper: function() {
        return priceFormatHelper;
    }
});
module.exports = __toCommonJS(src_exports);
// src/components/Checkout/index.tsx
var import_styled_components3 = __toESM(require("styled-components"));
var import_antd7 = require("antd");
// src/components/Checkout/Left/CheckoutSummary.tsx
var import_styled_components = __toESM(require("styled-components"));
var import_antd = require("antd");
// src/components/LibraLogo.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function LibraLogo(param) {
    var height = param.height, width = param.width, _param_fill = param.fill, fill = _param_fill === void 0 ? "rgb(30, 37, 53)" : _param_fill;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
        height: height,
        width: width,
        fill: fill,
        viewBox: "0 0 500 158.9",
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
                points: "236.37 40.29 220.82 40.29 220.82 132.35 280.22 132.35 280.22 117.13 236.47 117.13 236.37 40.29"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
                x: "289.68",
                y: "62.3",
                width: "14.79",
                height: "70.05"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
                x: "289.4",
                y: "36.93",
                width: "15.35",
                height: "15.41"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M376.98,71.9c-2.47-3.17-5.61-5.71-9.34-7.55-3.74-1.85-8.14-2.79-13.09-2.79-5.66,0-10.54,1.1-14.52,3.28-3.02,1.65-5.6,3.86-7.69,6.6v-31.22h-14.79v92.32h14.79v-10.36c.89,1.87,3.27,6.04,7.66,8.63,3.75,2.22,8.51,3.29,14.55,3.29,4.99,0,9.41-.94,13.13-2.79,3.71-1.85,6.84-4.4,9.31-7.58,2.45-3.17,4.31-6.91,5.52-11.14,1.2-4.19,1.81-8.77,1.81-13.63,0-4.55-.57-11.45-1.81-15.84-1.21-4.29-3.07-8.06-5.52-11.2Zm-8.22,34.91c0,4.12-1.57,7.37-4.8,9.92-3.25,2.57-7.52,3.87-12.68,3.87-6.12,0-10.86-1.74-14.07-5.17-3.39-3.62-4.87-5.75-4.87-10.99v-10.99c0-5.33,1.64-9.79,4.87-13.27,3.21-3.45,7.94-5.2,14.07-5.2,5.16,0,9.43,1.31,12.68,3.9,3.23,2.57,4.8,5.82,4.8,9.95v17.98Z"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
                points: "391.44 132.35 406.23 132.35 406.23 75.35 428.33 75.35 428.33 62.3 391.44 62.3 391.44 132.35"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M489.52,119.37v-31.95c0-4.76-.82-9.59-2.13-12.61-1.42-3.26-3.46-5.97-6.06-8.06-2.57-2.07-5.63-3.63-9.1-4.66-3.43-1.02-7.19-1.53-11.16-1.53s-7.74,.59-11.2,1.75c-3.48,1.17-6.55,2.86-9.12,5.01-2.59,2.16-4.68,4.76-6.21,7.71-1.55,2.98-2.33,6.3-2.33,9.88v1h14.79v-1c0-2.2,.32-4.1,.94-5.65,.61-1.5,1.52-2.72,2.72-3.62,2.52-1.89,5.98-2.86,10.27-2.86,2.18,0,4.18,.21,5.95,.63,1.7,.41,3.16,1.11,4.35,2.09,1.18,.97,2.11,2.32,2.76,4,.67,1.73,1.01,3.97,1.01,6.66v2.95l-22.8,2.11c-7.14,.64-12.5,2.97-16.06,6.99-3.57,4.02-5.36,8.84-5.36,14.46,0,2.84,.51,5.56,1.54,8.17,1.03,2.61,2.48,4.85,4.36,6.73,2.11,2.15,4.6,3.78,7.48,4.87,2.88,1.1,6.11,1.65,9.68,1.65,5.35,0,9.95-1.22,13.8-3.67,3.84-2.45,6.75-6.21,8.72-11.29l.1,2.11,.23,11.11h23.66v-12.98h-10.84Zm-14.51-16.17c0,5.63-1.44,10.23-4.31,13.79-2.87,3.56-6.8,5.33-11.79,5.33-3.51,0-6.27-.67-8.26-2.01-2-1.34-2.99-3.44-2.99-6.32v-5.51c0-1.8,.29-3.21,.87-4.25,.58-1.04,2-1.64,4.28-1.8l22.21-2.05v2.82Z"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M109.66,93.9c-.6-.13-.97-.29-1.13-.4-1.04-4.09,1.98-22.96,20.75-67.58l-14.13-5.94c-28.54,67.86-22.29,77.58-19.62,81.73,1.65,2.57,4.9,5.91,10.96,7.19,1.74,.37,3.59,.53,5.52,.53,16.48,0,38.61-12.15,42.77-14.88l-8.43-12.8c-7.86,5.18-28.25,13.93-36.68,12.15Z"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M89.22,138.06c-16.71,6.89-30.75,7.34-41.74,1.32-29.16-15.97-14.36-84.2-2.46-118.05l-14.46-5.08c-1.69,4.81-10.3,30.2-13.86,58.16-5.17,40.69,2.7,67.07,23.41,78.41,7.98,4.37,16.36,6.07,24.6,6.07,28.57,0,55.32-20.54,56.76-21.66l-9.43-12.09c-.09,.07-9.66,7.48-22.82,12.91Z"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M57.65,79.99c4.19-29.82,18.48-67.54,21.12-73.73L64.66,.25c-3.34,7.84-17.8,46.29-22.2,77.61l15.18,2.13Z"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                d: "M81.48,88.48C88.3,47.79,107.13,6.91,107.32,6.51L93.44,0c-.2,.42-19.92,43.24-27.08,85.95l15.12,2.53Z"
            })
        ]
    });
}
// src/config/index.ts
var EXTENSION_IDS = {
    POLKADOT_JS: "polkadot-js",
    METAMASK: "METAMASK"
};
var EXTENSIONS = [
    {
        id: "polkadot-js",
        name: "Polkadot.{Js}",
        installURL: "https://polkadot.js.org/extension/"
    },
    {
        id: "subwallet-js",
        name: "SubWallet",
        installURL: "https://www.subwallet.app/download.html"
    },
    {
        id: "talisman",
        name: "Talisman",
        installURL: "https://www.talisman.xyz"
    },
    {
        id: "enkrypt",
        name: "Enkrypt",
        installURL: "enkrypt.com"
    }
];
var NETWORKS_CONFIG = [
    {
        id: "nw_polkadot",
        name: "Polkadot",
        type: "substrate",
        rpc: "wss://apps-rpc.polkadot.io",
        config: {
            ss58Prefix: 0
        }
    },
    {
        id: "nw_kusama",
        name: "Kusama",
        type: "substrate",
        rpc: "wss://kusama-rpc.polkadot.io",
        config: {
            ss58Prefix: 2
        }
    }
];
var ASSETS_CONFIG = [
    {
        id: "ast_dot",
        symbol: "dot",
        name: "Polkadot",
        decimals: 10,
        logoUrl: "https://avatars.githubusercontent.com/u/33775474?s=200&v=4",
        networks: [
            {
                networkId: "nw_polkadot",
                config: {
                    isNative: true
                }
            }
        ]
    },
    {
        id: "ast_ksm",
        symbol: "ksm",
        name: "Kusama",
        decimals: 12,
        logoUrl: "https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/kusama_icon.svg",
        networks: [
            {
                networkId: "nw_kusama",
                config: {
                    isNative: true
                }
            }
        ]
    },
    {
        id: "ast_wnd",
        symbol: "wnd",
        name: "Westend",
        decimals: 12,
        logoUrl: "https://raw.githubusercontent.com/paritytech/polkadot-staking-dashboard/master/src/img/westend_icon.svg",
        networks: [
            {
                networkId: "nw_westend",
                config: {
                    isNative: true
                }
            }
        ]
    }
];
var GET_EXTENSIONS_MAX_RETRY = 10;
var GET_EXTENSIONS_INTERVAL_DURATION = 500;
// src/utils/asset.ts
var getWalletNetworks = function(walletType) {
    return NETWORKS_CONFIG.filter(function(param) {
        var type = param.type;
        return type === walletType;
    });
};
var getNetworkAssets = function(networkId) {
    return ASSETS_CONFIG.reduce(function(assets, asset) {
        var networks = asset.networks;
        var matchedNetwork = networks.find(function(netWork) {
            return netWork.networkId === networkId;
        });
        if (matchedNetwork) {
            return _to_consumable_array(assets).concat([
                _object_spread_props(_object_spread({}, asset), {
                    network: matchedNetwork
                })
            ]);
        } else {
            return assets;
        }
    }, []);
};
var getAssetMetadata = function(asset) {
    var assets = getNetworkAssets(asset.networkId);
    var assetMetadata = assets.find(function(param) {
        var id = param.id;
        return id === asset.assetId;
    });
    var initAssetMetadata = {
        id: "",
        symbol: "",
        name: "",
        decimals: 0,
        logoUrl: "",
        network: {
            networkId: "",
            config: {
                isNative: false
            }
        }
    };
    return assetMetadata !== null && assetMetadata !== void 0 ? assetMetadata : initAssetMetadata;
};
var getNetwork = function(asset) {
    var netWork = NETWORKS_CONFIG.find(function(param) {
        var id = param.id;
        return id === asset.networkId;
    });
    var initNetwork = {
        id: "",
        name: "",
        type: "substrate",
        rpc: "",
        config: {}
    };
    return netWork !== null && netWork !== void 0 ? netWork : initNetwork;
};
var getExtensionId = function(asset) {
    var nextwork = getNetwork(asset);
    if (nextwork.type === "substrate") {
        return "polkadot-js";
    }
};
// src/utils/index.ts
var import_jsbi = __toESM(require("jsbi"));
function toReverseArray(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    return reverseArray;
}
var getDecimalsShouldBeDecrease = function(stringNumber) {
    var reversedArray = toReverseArray(stringNumber);
    var count = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = reversedArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var number = _step.value;
            if (number !== "0") {
                return count;
            }
            count += 1;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return count;
};
function formatBalance(amount, asset) {
    var metadata = getAssetMetadata(asset);
    if (!metadata) {
        return Number(amount);
    }
    var decimals = metadata.decimals;
    var decimalsShouldBeDecrease = getDecimalsShouldBeDecrease(amount);
    if (decimalsShouldBeDecrease < metadata.decimals) {
        var nextAmount = amount.slice(0, amount.length - decimalsShouldBeDecrease);
        var nextDecimals = decimals - decimalsShouldBeDecrease;
        var isUnderOne = nextAmount.length <= nextDecimals;
        if (isUnderOne) {
            return Number(nextAmount) / Math.pow(10, Number(nextDecimals));
        }
        var intNumberPart = nextAmount.slice(0, nextDecimals);
        var decimalNumberPart = nextAmount.slice(nextDecimals, nextAmount.length);
        var decimalNumber = Number(decimalNumberPart) / Math.pow(10, Number(decimalNumberPart.length));
        return Number(intNumberPart) + decimalNumber;
    }
    var scale = import_jsbi.default.exponentiate(import_jsbi.default.BigInt(10), import_jsbi.default.BigInt(metadata.decimals));
    var result = import_jsbi.default.divide(import_jsbi.default.BigInt(amount), scale).toString();
    return Number(result);
}
function exponentToStringDecimals(num) {
    if (num < 1e-6) {
        var numChunks = [];
        numChunks = num.toString().split("e");
        var numOfZeroes = Math.abs(numChunks[1]) - 1;
        var decimalNumber = "";
        var zeroes = "";
        var int = numChunks[0];
        for(var i = 0; i < int.length; i++){
            int = int.replace(".", "");
        }
        for(var i1 = 0; i1 < numOfZeroes; i1++){
            zeroes += "0";
        }
        return "0." + zeroes + int;
    } else {
        return num.toString();
    }
}
function toSmallestUnit(originAmount, asset) {
    try {
        var metadata = getAssetMetadata(asset);
        if (!metadata) {
            return 0;
        }
        var amount = originAmount;
        var decimals = metadata === null || metadata === void 0 ? void 0 : metadata.decimals;
        if (!Number.isInteger(amount)) {
            var decimalLength = exponentToStringDecimals(amount).split(".")[1].length;
            decimals = decimals - decimalLength;
            amount = amount * Math.pow(10, decimalLength);
        }
        var scale = import_jsbi.default.exponentiate(import_jsbi.default.BigInt(10), import_jsbi.default.BigInt(decimals));
        var stringNumber = import_jsbi.default.multiply(import_jsbi.default.BigInt(amount), scale).toString();
        return stringNumber;
    } catch (err) {
        console.log("err", err);
    }
}
var getCheckoutPrice = function(param, assetMetadata) {
    var price = param.price, asset = param.asset;
    var nextPrice = typeof price !== "number" ? formatBalance(price, asset) : price;
    var unit = assetMetadata ? assetMetadata.symbol : asset;
    var formattedPrice = nextPrice.toLocaleString("en-US", {
        style: "decimal",
        maximumFractionDigits: assetMetadata.decimals
    });
    return "".concat(formattedPrice, " ").concat(unit);
};
var priceFormatHelper = {
    formatBalance: formatBalance,
    toSmallestUnit: toSmallestUnit,
    getCheckoutPrice: getCheckoutPrice
};
// src/components/Checkout/Left/CheckoutSummary.tsx
var import_react_i18next = require("react-i18next");
var import_jsx_runtime2 = require("react/jsx-runtime");
var _import_antd_Typography = import_antd.Typography, Paragraph = _import_antd_Typography.Paragraph, Link = _import_antd_Typography.Link;
var ImageWrapper = import_styled_components.default.div(_templateObject());
var ProductInfoWrapper = import_styled_components.default.div(_templateObject1());
var ProductInformation = function(param) {
    var product = param.product, asset = param.asset, loading = param.loading;
    var _ref = product || {}, name = _ref.name, description = _ref.description, price = _ref.price, image = _ref.image;
    var assetMetadata = getAssetMetadata(asset);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ProductInfoWrapper, {
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Skeleton, {
                active: true,
                className: "product-name-skeleton",
                paragraph: false,
                loading: loading,
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Typography.Title, {
                    type: "secondary",
                    level: 4,
                    style: {
                        marginBottom: 0,
                        fontWeight: 400
                    },
                    children: name || "Product name"
                })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Skeleton, {
                active: true,
                className: "product-price-skeleton",
                paragraph: false,
                loading: loading,
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_antd.Space, {
                    align: "center",
                    style: {
                        marginTop: 10
                    },
                    children: [
                        assetMetadata && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Avatar, {
                            src: assetMetadata.logoUrl,
                            children: assetMetadata.symbol
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Typography.Title, {
                            level: 3,
                            style: {
                                margin: 0,
                                fontSize: 32
                            },
                            children: price ? getCheckoutPrice({
                                price: price,
                                asset: asset
                            }, assetMetadata) : "0"
                        })
                    ]
                })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Skeleton, {
                active: true,
                className: "product-description-skeleton",
                paragraph: false,
                loading: loading,
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Typography.Paragraph, {
                    type: "secondary",
                    children: description
                })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ImageWrapper, {
                children: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Skeleton.Avatar, {
                    shape: "square",
                    active: true,
                    className: "product-image-skeleton"
                }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Image, {
                    src: image,
                    preview: false,
                    style: {
                        maxWidth: 300,
                        maxHeight: 300
                    }
                })
            })
        ]
    });
};
var FooterLink = (0, import_styled_components.default)(Link)(_templateObject2());
function FooterLinks() {
    var _ref = (0, import_react_i18next.useTranslation)(), t2 = _ref.t;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_antd.Space, {
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("a", {
                href: "https://golibra.xyz",
                target: "_blank",
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_antd.Space, {
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Paragraph, {
                            style: {
                                margin: 0
                            },
                            strong: true,
                            children: t2("poweredBy")
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LibraLogo, {
                            height: 18
                        })
                    ]
                })
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd.Divider, {
                type: "vertical",
                style: {
                    height: 20
                }
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(FooterLink, {
                href: "https://golibra.xyz/privacy-policy",
                target: "_blank",
                children: [
                    " ",
                    t2("privacy")
                ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FooterLink, {
                href: "https://golibra.xyz/terms-of-service",
                target: "_blank",
                children: t2("terms")
            })
        ]
    });
}
var CheckoutSummaryWrapper = import_styled_components.default.div(_templateObject3());
var CheckoutSummary = function(param) {
    var product = param.product, asset = param.asset, previewMode = param.previewMode, loading = param.loading;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(CheckoutSummaryWrapper, {
        style: previewMode ? {
            maxHeight: 550
        } : {},
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ProductInformation, {
                product: product,
                asset: asset,
                loading: loading
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FooterLinks, {})
            })
        ]
    });
};
var CheckoutSummary_default = CheckoutSummary;
// src/components/Checkout/Right/PaymentPreviewer/index.tsx
var import_react5 = require("react");
var import_antd4 = require("antd");
var import_react_i18next3 = require("react-i18next");
// src/components/Checkout/Right/PaymentPreviewer/AccountOption.tsx
var import_react3 = require("react");
var import_antd2 = require("antd");
// ../../node_modules/@ant-design/icons/es/components/Context.js
var import_react = require("react");
var IconContext = /* @__PURE__ */ (0, import_react.createContext)({});
var Context_default = IconContext;
// ../../node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj2) {
        return typeof obj2;
    } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
}
// ../../node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
// ../../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
}
// ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
// ../../node_modules/@babel/runtime/helpers/esm/objectSpread2.js
function ownKeys1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys1(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
// ../../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
// ../../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = false;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true);
        } catch (err) {
            _d = true, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
// ../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
// ../../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// ../../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// ../../node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// ../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
// ../../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
// ../../node_modules/@ant-design/icons/es/components/AntdIcon.js
var React2 = __toESM(require("react"));
var import_classnames = __toESM(require_classnames());
// ../../node_modules/@ctrl/tinycolor/dist/module/util.js
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = "100%";
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
        return 1;
    }
    if (max === 360) {
        n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
    } else {
        n = n % max / parseFloat(String(max));
    }
    return n;
}
function isOnePointZero(n) {
    return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
function convertToPercentage(n) {
    if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
    }
    return n;
}
function pad2(c) {
    return c.length === 1 ? "0" + c : String(c);
}
// ../../node_modules/@ctrl/tinycolor/dist/module/conversion.js
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}
function hue2rgb(p, q, t2) {
    if (t2 < 0) {
        t2 += 1;
    }
    if (t2 > 1) {
        t2 -= 1;
    }
    if (t2 < 1 / 6) {
        return p + (q - p) * (6 * t2);
    }
    if (t2 < 1 / 2) {
        return q;
    }
    if (t2 < 2 / 3) {
        return p + (q - p) * (2 / 3 - t2) * 6;
    }
    return p;
}
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        g = l;
        b = l;
        r = l;
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
}
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    } else {
        switch(max){
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        v: v
    };
}
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t2 = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [
        v,
        q,
        p,
        p,
        t2,
        v
    ][mod];
    var g = [
        t2,
        v,
        v,
        q,
        p,
        p
    ][mod];
    var b = [
        p,
        p,
        t2,
        v,
        v,
        q
    ][mod];
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
}
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
}
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
// ../../node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
var names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
// ../../node_modules/@ctrl/tinycolor/dist/module/format-input.js
function inputToRGB(color) {
    var rgb = {
        r: 0,
        g: 0,
        b: 0
    };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === "string") {
        color = stringInputToObject(color);
    }
    if (typeof color === "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }
        if (Object.prototype.hasOwnProperty.call(color, "a")) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a
    };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    } else if (color === "transparent") {
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
        };
    }
    var match = matchers.rgb.exec(color);
    if (match) {
        return {
            r: match[1],
            g: match[2],
            b: match[3]
        };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
        };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return {
            h: match[1],
            s: match[2],
            l: match[3]
        };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
        };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return {
            h: match[1],
            s: match[2],
            v: match[3]
        };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
        };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? "name" : "hex"
        };
    }
    return false;
}
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
// ../../node_modules/@ant-design/colors/es/generate.js
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [
    {
        index: 7,
        opacity: 0.15
    },
    {
        index: 6,
        opacity: 0.25
    },
    {
        index: 5,
        opacity: 0.3
    },
    {
        index: 5,
        opacity: 0.45
    },
    {
        index: 5,
        opacity: 0.65
    },
    {
        index: 5,
        opacity: 0.85
    },
    {
        index: 4,
        opacity: 0.9
    },
    {
        index: 3,
        opacity: 0.95
    },
    {
        index: 2,
        opacity: 0.97
    },
    {
        index: 1,
        opacity: 0.98
    }
];
function toHsv(_ref) {
    var r = _ref.r, g = _ref.g, b = _ref.b;
    var hsv = rgbToHsv(r, g, b);
    return {
        h: hsv.h * 360,
        s: hsv.s,
        v: hsv.v
    };
}
function toHex(_ref2) {
    var r = _ref2.r, g = _ref2.g, b = _ref2.b;
    return "#".concat(rgbToHex(r, g, b, false));
}
function mix(rgb1, rgb2, amount) {
    var p = amount / 100;
    var rgb = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b
    };
    return rgb;
}
function getHue(hsv, i, light) {
    var hue;
    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
        hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
    } else {
        hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
    }
    if (hue < 0) {
        hue += 360;
    } else if (hue >= 360) {
        hue -= 360;
    }
    return hue;
}
function getSaturation(hsv, i, light) {
    if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s;
    }
    var saturation;
    if (light) {
        saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep;
    } else {
        saturation = hsv.s + saturationStep2 * i;
    }
    if (saturation > 1) {
        saturation = 1;
    }
    if (light && i === lightColorCount && saturation > 0.1) {
        saturation = 0.1;
    }
    if (saturation < 0.06) {
        saturation = 0.06;
    }
    return Number(saturation.toFixed(2));
}
function getValue(hsv, i, light) {
    var value;
    if (light) {
        value = hsv.v + brightnessStep1 * i;
    } else {
        value = hsv.v - brightnessStep2 * i;
    }
    if (value > 1) {
        value = 1;
    }
    return Number(value.toFixed(2));
}
function generate(color) {
    var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var patterns = [];
    var pColor = inputToRGB(color);
    for(var i = lightColorCount; i > 0; i -= 1){
        var hsv = toHsv(pColor);
        var colorString = toHex(inputToRGB({
            h: getHue(hsv, i, true),
            s: getSaturation(hsv, i, true),
            v: getValue(hsv, i, true)
        }));
        patterns.push(colorString);
    }
    patterns.push(toHex(pColor));
    for(var _i = 1; _i <= darkColorCount; _i += 1){
        var _hsv = toHsv(pColor);
        var _colorString = toHex(inputToRGB({
            h: getHue(_hsv, _i),
            s: getSaturation(_hsv, _i),
            v: getValue(_hsv, _i)
        }));
        patterns.push(_colorString);
    }
    if (opts.theme === "dark") {
        return darkColorMap.map(function(_ref3) {
            var index = _ref3.index, opacity = _ref3.opacity;
            var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || "#141414"), inputToRGB(patterns[index]), opacity * 100));
            return darkColorString;
        });
    }
    return patterns;
}
// ../../node_modules/@ant-design/colors/es/index.js
var presetPrimaryColors = {
    red: "#F5222D",
    volcano: "#FA541C",
    orange: "#FA8C16",
    gold: "#FAAD14",
    yellow: "#FADB14",
    lime: "#A0D911",
    green: "#52C41A",
    cyan: "#13C2C2",
    blue: "#1677FF",
    geekblue: "#2F54EB",
    purple: "#722ED1",
    magenta: "#EB2F96",
    grey: "#666666"
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function(key) {
    presetPalettes[key] = generate(presetPrimaryColors[key]);
    presetPalettes[key].primary = presetPalettes[key][5];
    presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
        theme: "dark",
        backgroundColor: "#141414"
    });
    presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});
var red = presetPalettes.red;
var volcano = presetPalettes.volcano;
var gold = presetPalettes.gold;
var orange = presetPalettes.orange;
var yellow = presetPalettes.yellow;
var lime = presetPalettes.lime;
var green = presetPalettes.green;
var cyan = presetPalettes.cyan;
var blue = presetPalettes.blue;
var geekblue = presetPalettes.geekblue;
var purple = presetPalettes.purple;
var magenta = presetPalettes.magenta;
var grey = presetPalettes.grey;
var gray = presetPalettes.grey;
// ../../node_modules/@ant-design/icons/es/utils.js
var import_react2 = __toESM(require("react"));
// ../../node_modules/rc-util/es/warning.js
var warned = {};
function warning(valid, message) {
    if (process.env.NODE_ENV !== "production" && !valid && console !== void 0) {
        console.error("Warning: ".concat(message));
    }
}
function call(method, valid, message) {
    if (!valid && !warned[message]) {
        method(false, message);
        warned[message] = true;
    }
}
function warningOnce(valid, message) {
    call(warning, valid, message);
}
var warning_default = warningOnce;
// ../../node_modules/rc-util/es/Dom/canUseDom.js
function canUseDom() {
    return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
// ../../node_modules/rc-util/es/Dom/contains.js
function contains(root, n) {
    if (!root) {
        return false;
    }
    if (root.contains) {
        return root.contains(n);
    }
    var node = n;
    while(node){
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}
// ../../node_modules/rc-util/es/Dom/dynamicCSS.js
var APPEND_ORDER = "data-rc-order";
var MARK_KEY = "rc-util-key";
var containerCache = /* @__PURE__ */ new Map();
function getMark() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
    if (mark) {
        return mark.startsWith("data-") ? mark : "data-".concat(mark);
    }
    return MARK_KEY;
}
function getContainer(option) {
    if (option.attachTo) {
        return option.attachTo;
    }
    var head = document.querySelector("head");
    return head || document.body;
}
function getOrder(prepend) {
    if (prepend === "queue") {
        return "prependQueue";
    }
    return prepend ? "prepend" : "append";
}
function findStyles(container) {
    return Array.from((containerCache.get(container) || container).children).filter(function(node) {
        return node.tagName === "STYLE";
    });
}
function injectCSS(css) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!canUseDom()) {
        return null;
    }
    var csp = option.csp, prepend = option.prepend;
    var styleNode = document.createElement("style");
    styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
    if (csp !== null && csp !== void 0 && csp.nonce) {
        styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
    }
    styleNode.innerHTML = css;
    var container = getContainer(option);
    var firstChild = container.firstChild;
    if (prepend) {
        if (prepend === "queue") {
            var existStyle = findStyles(container).filter(function(node) {
                return [
                    "prepend",
                    "prependQueue"
                ].includes(node.getAttribute(APPEND_ORDER));
            });
            if (existStyle.length) {
                container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
                return styleNode;
            }
        }
        container.insertBefore(styleNode, firstChild);
    } else {
        container.appendChild(styleNode);
    }
    return styleNode;
}
function findExistNode(key) {
    var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var container = getContainer(option);
    return findStyles(container).find(function(node) {
        return node.getAttribute(getMark(option)) === key;
    });
}
function syncRealContainer(container, option) {
    var cachedRealContainer = containerCache.get(container);
    if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
        var placeholderStyle = injectCSS("", option);
        var parentNode = placeholderStyle.parentNode;
        containerCache.set(container, parentNode);
        container.removeChild(placeholderStyle);
    }
}
function updateCSS(css, key) {
    var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var container = getContainer(option);
    syncRealContainer(container, option);
    var existNode = findExistNode(key, option);
    if (existNode) {
        var _option$csp, _option$csp2;
        if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
            var _option$csp3;
            existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
        }
        if (existNode.innerHTML !== css) {
            existNode.innerHTML = css;
        }
        return existNode;
    }
    var newNode = injectCSS(css, option);
    newNode.setAttribute(getMark(option), key);
    return newNode;
}
// ../../node_modules/@ant-design/icons/es/utils.js
function warning2(valid, message) {
    warning_default(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
    return _typeof(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && (_typeof(target.icon) === "object" || typeof target.icon === "function");
}
function normalizeAttrs() {
    var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Object.keys(attrs).reduce(function(acc, key) {
        var val = attrs[key];
        switch(key){
            case "class":
                acc.className = val;
                delete acc.class;
                break;
            default:
                acc[key] = val;
        }
        return acc;
    }, {});
}
function generate2(node, key, rootProps) {
    if (!rootProps) {
        return /* @__PURE__ */ import_react2.default.createElement(node.tag, _objectSpread2({
            key: key
        }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index) {
            return generate2(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
        }));
    }
    return /* @__PURE__ */ import_react2.default.createElement(node.tag, _objectSpread2(_objectSpread2({
        key: key
    }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index) {
        return generate2(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
}
function getSecondaryColor(primaryColor) {
    return generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
    if (!twoToneColor) {
        return [];
    }
    return Array.isArray(twoToneColor) ? twoToneColor : [
        twoToneColor
    ];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles2() {
    var styleStr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : iconStyles;
    var _useContext = (0, import_react2.useContext)(Context_default), csp = _useContext.csp, prefixCls = _useContext.prefixCls;
    var mergedStyleStr = styleStr;
    if (prefixCls) {
        mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
    }
    (0, import_react2.useEffect)(function() {
        updateCSS(mergedStyleStr, "@ant-design-icons", {
            prepend: true,
            csp: csp
        });
    }, []);
};
// ../../node_modules/@ant-design/icons/es/components/IconBase.js
var _excluded = [
    "icon",
    "className",
    "onClick",
    "style",
    "primaryColor",
    "secondaryColor"
];
var twoToneColorPalette = {
    primaryColor: "#333",
    secondaryColor: "#E6E6E6",
    calculated: false
};
function setTwoToneColors(_ref) {
    var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
    twoToneColorPalette.primaryColor = primaryColor;
    twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
    return _objectSpread2({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props) {
    var icon = props.icon, className = props.className, onClick = props.onClick, style = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded);
    var colors = twoToneColorPalette;
    if (primaryColor) {
        colors = {
            primaryColor: primaryColor,
            secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
        };
    }
    useInsertStyles();
    warning2(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
    if (!isIconDefinition(icon)) {
        return null;
    }
    var target = icon;
    if (target && typeof target.icon === "function") {
        target = _objectSpread2(_objectSpread2({}, target), {}, {
            icon: target.icon(colors.primaryColor, colors.secondaryColor)
        });
    }
    return generate2(target.icon, "svg-".concat(target.name), _objectSpread2({
        className: className,
        onClick: onClick,
        style: style,
        "data-icon": target.name,
        width: "1em",
        height: "1em",
        fill: "currentColor",
        "aria-hidden": "true"
    }, restProps));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
var IconBase_default = IconBase;
// ../../node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js
function setTwoToneColor(twoToneColor) {
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return IconBase_default.setTwoToneColors({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
    });
}
function getTwoToneColor() {
    var colors = IconBase_default.getTwoToneColors();
    if (!colors.calculated) {
        return colors.primaryColor;
    }
    return [
        colors.primaryColor,
        colors.secondaryColor
    ];
}
// ../../node_modules/@ant-design/icons/es/components/AntdIcon.js
var _excluded2 = [
    "className",
    "icon",
    "spin",
    "rotate",
    "tabIndex",
    "onClick",
    "twoToneColor"
];
setTwoToneColor("#1890ff");
var Icon = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
    var _classNames;
    var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties(props, _excluded2);
    var _React$useContext = React2.useContext(Context_default), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
    var classString = (0, import_classnames.default)(rootClassName, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className);
    var iconTabIndex = tabIndex;
    if (iconTabIndex === void 0 && onClick) {
        iconTabIndex = -1;
    }
    var svgStyle = rotate ? {
        msTransform: "rotate(".concat(rotate, "deg)"),
        transform: "rotate(".concat(rotate, "deg)")
    } : void 0;
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
    return /* @__PURE__ */ React2.createElement("span", _objectSpread2(_objectSpread2({
        role: "img",
        "aria-label": icon.name
    }, restProps), {}, {
        ref: ref,
        tabIndex: iconTabIndex,
        onClick: onClick,
        className: classString
    }), /* @__PURE__ */ React2.createElement(IconBase_default, {
        icon: icon,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        style: svgStyle
    }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
var AntdIcon_default = Icon;
// ../../node_modules/@ant-design/icons/es/icons/DownOutlined.js
var React3 = __toESM(require("react"));
// ../../node_modules/@ant-design/icons-svg/es/asn/DownOutlined.js
var DownOutlined = {
    "icon": {
        "tag": "svg",
        "attrs": {
            "viewBox": "64 64 896 896",
            "focusable": "false"
        },
        "children": [
            {
                "tag": "path",
                "attrs": {
                    "d": "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                }
            }
        ]
    },
    "name": "down",
    "theme": "outlined"
};
var DownOutlined_default = DownOutlined;
// ../../node_modules/@ant-design/icons/es/icons/DownOutlined.js
var DownOutlined2 = function DownOutlined3(props, ref) {
    return /* @__PURE__ */ React3.createElement(AntdIcon_default, _objectSpread2(_objectSpread2({}, props), {}, {
        ref: ref,
        icon: DownOutlined_default
    }));
};
DownOutlined2.displayName = "DownOutlined";
var DownOutlined_default2 = /* @__PURE__ */ React3.forwardRef(DownOutlined2);
// ../../node_modules/@ant-design/icons/es/icons/Loading3QuartersOutlined.js
var React4 = __toESM(require("react"));
// ../../node_modules/@ant-design/icons-svg/es/asn/Loading3QuartersOutlined.js
var Loading3QuartersOutlined = {
    "icon": {
        "tag": "svg",
        "attrs": {
            "viewBox": "0 0 1024 1024",
            "focusable": "false"
        },
        "children": [
            {
                "tag": "path",
                "attrs": {
                    "d": "M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"
                }
            }
        ]
    },
    "name": "loading-3-quarters",
    "theme": "outlined"
};
var Loading3QuartersOutlined_default = Loading3QuartersOutlined;
// ../../node_modules/@ant-design/icons/es/icons/Loading3QuartersOutlined.js
var Loading3QuartersOutlined2 = function Loading3QuartersOutlined3(props, ref) {
    return /* @__PURE__ */ React4.createElement(AntdIcon_default, _objectSpread2(_objectSpread2({}, props), {}, {
        ref: ref,
        icon: Loading3QuartersOutlined_default
    }));
};
Loading3QuartersOutlined2.displayName = "Loading3QuartersOutlined";
var Loading3QuartersOutlined_default2 = /* @__PURE__ */ React4.forwardRef(Loading3QuartersOutlined2);
// src/components/Checkout/Right/PaymentPreviewer/AccountOption.tsx
var import_react_identicon = __toESM(require("@polkadot/react-identicon"));
var import_react_jazzicon = __toESM(require_dist());
var import_jsx_runtime3 = require("react/jsx-runtime");
var _import_antd2_Typography = import_antd2.Typography, Paragraph2 = _import_antd2_Typography.Paragraph;
function AccountInfo(param) {
    var account = param.account, _param_variant = param.variant, variant = _param_variant === void 0 ? "default" : _param_variant;
    var name = account.name, address = account.address, type = account.type;
    var _import_antd2_theme_useToken = import_antd2.theme.useToken(), _import_antd2_theme_useToken_token = _import_antd2_theme_useToken.token, colorPrimary = _import_antd2_theme_useToken_token.colorPrimary, colorBorder = _import_antd2_theme_useToken_token.colorBorder;
    var _ref = _sliced_to_array((0, import_react3.useState)(false), 2), hovered = _ref[0], setHovered = _ref[1];
    var shortedAddress = "".concat(account.address.slice(0, 16), "...").concat(account.address.slice(-12));
    var style = {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 16px",
        borderRadius: "8px"
    };
    if (variant === "select") {
        style = _object_spread_props(_object_spread({}, style), {
            cursor: "pointer",
            border: "solid 1px ".concat(hovered ? colorPrimary : colorBorder)
        });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", {
        style: style,
        onMouseEnter: function() {
            return setHovered(true);
        },
        onMouseLeave: function() {
            return setHovered(false);
        },
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_antd2.Space, {
                align: "center",
                size: "middle",
                children: [
                    type === "polkadot-js" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_identicon.default, {
                        value: address,
                        size: 24,
                        theme: "substrate"
                    }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_jazzicon.default, {
                        diameter: 24,
                        seed: (0, import_react_jazzicon.jsNumberForAddress)(account.address)
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_antd2.Space, {
                        direction: "vertical",
                        size: 4,
                        children: [
                            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Paragraph2, {
                                strong: true,
                                style: {
                                    marginBottom: 0
                                },
                                children: name
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Paragraph2, {
                                style: {
                                    marginBottom: "0",
                                    fontSize: "12px"
                                },
                                children: shortedAddress
                            })
                        ]
                    })
                ]
            }),
            variant === "select" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DownOutlined_default2, {
                style: {
                    color: hovered ? colorPrimary : colorBorder
                }
            })
        ]
    });
}
// src/components/Checkout/Right/PaymentPreviewer/ContactInformation.tsx
var import_react4 = require("react");
var import_antd3 = require("antd");
var import_react_i18next2 = require("react-i18next");
var import_jsx_runtime4 = require("react/jsx-runtime");
var ContactInformation = function(param) {
    var productName = param.productName, value = param.value, onChange = param.onChange, error2 = param.error, resetError = param.resetError;
    var _ref = (0, import_react_i18next2.useTranslation)(), t2 = _ref.t;
    var _ref1 = _sliced_to_array((0, import_react4.useState)(false), 2), emailHovered = _ref1[0], setEmailHovered = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react4.useState)(false), 2), emailFocused = _ref2[0], setEmailFocused = _ref2[1];
    var hasEmailHelpText = !error2 && (emailFocused || emailHovered);
    var getHelpText = function() {
        if (error2) {
            return error2;
        }
        if (hasEmailHelpText) {
            return t2("emailHelpText", {
                productName: productName || "The Product"
            });
        }
        return "";
    };
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", {
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_antd3.Typography.Title, {
                level: 4,
                style: {
                    marginBottom: 12
                },
                children: t2("contactInformation")
            }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_antd3.Form, {
                layout: "vertical",
                requiredMark: false,
                onMouseEnter: function() {
                    setEmailHovered(true);
                },
                onMouseLeave: function() {
                    setEmailHovered(false);
                },
                onFocus: function() {
                    setEmailFocused(true);
                    resetError === null || resetError === void 0 ? void 0 : resetError();
                },
                onBlur: function() {
                    return setEmailFocused(false);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_antd3.Form.Item, {
                    label: "Email",
                    validateStatus: error2 ? "error" : void 0,
                    help: getHelpText(),
                    style: {
                        height: 88
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_antd3.Input, {
                        value: value,
                        onInput: function(e) {
                            onChange(e.target.value);
                        },
                        placeholder: "john.doe@example.com"
                    })
                })
            })
        ]
    });
};
var ContactInformation_default = ContactInformation;
// src/components/Checkout/Right/PaymentPreviewer/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var EXAMPLE_POLKADOT_ADDRESS = "5ERjkQVj8M7v5UVZQ8qTbZ2qb1o5TgNXq9tXt2BsWF9jBpDu";
var EXAMPLE_METAMASK_ADDRESS = "0x71a753bFc4F9AeADc744c2Aa01e928bfD4BF5ceC";
function PaymentSummary(param) {
    var payment = param.payment;
    var _ref = (0, import_react_i18next3.useTranslation)(), t2 = _ref.t;
    var _ref1 = _sliced_to_array((0, import_react5.useState)(false), 2), loading = _ref1[0], setLoading = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react5.useState)(""), 2), email = _ref2[0], setEmail = _ref2[1];
    var extensionId = getExtensionId(payment.asset);
    return(//TODO: Fix style
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
        style: {
            width: 430,
            maxWidth: 430,
            marginLeft: 50
        },
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ContactInformation_default, {
                value: email,
                onChange: setEmail,
                productName: payment.productName
            }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_antd4.Typography.Title, {
                        level: 4,
                        children: [
                            t2("paymentMethod"),
                            " "
                        ]
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AccountInfo, {
                        variant: "select",
                        account: {
                            name: "Test Account",
                            address: extensionId === "polkadot-js" ? EXAMPLE_POLKADOT_ADDRESS : EXAMPLE_METAMASK_ADDRESS,
                            type: extensionId || "polkadot-js"
                        }
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_antd4.Button, {
                        style: {
                            marginTop: 32,
                            marginBottom: 8
                        },
                        type: "primary",
                        size: "large",
                        block: true,
                        loading: loading,
                        onClick: function() {
                            setLoading(true);
                            setTimeout(function() {
                                setLoading(false);
                            }, 1e3);
                        },
                        children: t2("pay")
                    })
                ]
            })
        ]
    }));
}
// src/components/Checkout/Brand.tsx
var import_react6 = require("react");
var import_styled_components2 = __toESM(require("styled-components"));
var import_antd5 = require("antd");
var import_jsx_runtime6 = require("react/jsx-runtime");
var Title = import_antd5.Typography.Title;
var LogoBox = import_styled_components2.default.div(_templateObject4());
var LogoWrapper = import_styled_components2.default.div(_templateObject5());
var CheckoutBrand = function(param) {
    var branding = param.branding, loading = param.loading;
    var name = branding.name, logo = branding.logo;
    var HasNoBrand = !logo && !name;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LogoBox, {
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LogoWrapper, {
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_antd5.Skeleton, {
                className: "brand-skeleton",
                paragraph: false,
                loading: loading,
                active: true,
                children: HasNoBrand ? "Brand" : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react6.Fragment, {
                    children: [
                        logo && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", {
                            style: {
                                height: 24,
                                marginRight: 10
                            },
                            src: logo,
                            alt: "brand logo"
                        }),
                        name && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Title, {
                            style: {
                                margin: 0
                            },
                            level: 5,
                            children: name
                        })
                    ]
                })
            })
        })
    });
};
var Brand_default = CheckoutBrand;
// src/components/Checkout/Right/AfterPaymentPreviewer.tsx
var import_antd6 = require("antd");
var import_react_i18next4 = require("react-i18next");
var import_jsx_runtime7 = require("react/jsx-runtime");
var AfterPaymentPreviewer = function(param) {
    var afterPayment = param.afterPayment, productName = param.productName;
    var _afterPayment_config;
    var _ref = (0, import_react_i18next4.useTranslation)(), t2 = _ref.t;
    var message = (_afterPayment_config = afterPayment.config) === null || _afterPayment_config === void 0 ? void 0 : _afterPayment_config.message;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", {
        style: {
            width: 380,
            maxWidth: 380,
            marginLeft: "auto"
        },
        children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_antd6.Result, {
                status: "success",
                title: message || t2("thankForYourPayment"),
                subTitle: !message && t2("productWillBeSent", {
                    productName: productName
                })
            })
        ]
    });
};
var AfterPaymentPreviewer_default = AfterPaymentPreviewer;
// ../../node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance2, Constructor) {
    if (!_instanceof(instance2, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
// ../../node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
// ../../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
// ../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
    };
    return _setPrototypeOf(o, p);
}
// ../../node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
// ../../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call2) {
    if (call2 && (_typeof(call2) === "object" || typeof call2 === "function")) {
        return call2;
    } else if (call2 !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
}
// ../../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
}
// ../../node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// ../../node_modules/@babel/runtime/helpers/esm/toArray.js
function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
// ../../node_modules/i18next/dist/esm/i18next.js
function ownKeys$6(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$6(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$6(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
var consoleLogger = {
    type: "logger",
    log: function log(args) {
        this.output("log", args);
    },
    warn: function warn(args) {
        this.output("warn", args);
    },
    error: function error(args) {
        this.output("error", args);
    },
    output: function output(type, args) {
        if (console && console[type]) console[type].apply(console, args);
    }
};
var Logger = function() {
    function Logger2(concreteLogger) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, Logger2);
        this.init(concreteLogger, options);
    }
    _createClass(Logger2, [
        {
            key: "init",
            value: function init2(concreteLogger) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                this.prefix = options.prefix || "i18next:";
                this.logger = concreteLogger || consoleLogger;
                this.options = options;
                this.debug = options.debug;
            }
        },
        {
            key: "setDebug",
            value: function setDebug(bool) {
                this.debug = bool;
            }
        },
        {
            key: "log",
            value: function log2() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return this.forward(args, "log", "", true);
            }
        },
        {
            key: "warn",
            value: function warn2() {
                for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
                    args[_key2] = arguments[_key2];
                }
                return this.forward(args, "warn", "", true);
            }
        },
        {
            key: "error",
            value: function error2() {
                for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++){
                    args[_key3] = arguments[_key3];
                }
                return this.forward(args, "error", "");
            }
        },
        {
            key: "deprecate",
            value: function deprecate() {
                for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++){
                    args[_key4] = arguments[_key4];
                }
                return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
            }
        },
        {
            key: "forward",
            value: function forward(args, lvl, prefix, debugOnly) {
                if (debugOnly && !this.debug) return null;
                if (typeof args[0] === "string") args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
                return this.logger[lvl](args);
            }
        },
        {
            key: "create",
            value: function create(moduleName) {
                return new Logger2(this.logger, _objectSpread$6(_objectSpread$6({}, {
                    prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
                }), this.options));
            }
        },
        {
            key: "clone",
            value: function clone(options) {
                options = options || this.options;
                options.prefix = options.prefix || this.prefix;
                return new Logger2(this.logger, options);
            }
        }
    ]);
    return Logger2;
}();
var baseLogger = new Logger();
var EventEmitter = function() {
    function EventEmitter2() {
        _classCallCheck(this, EventEmitter2);
        this.observers = {};
    }
    _createClass(EventEmitter2, [
        {
            key: "on",
            value: function on(events, listener) {
                var _this = this;
                events.split(" ").forEach(function(event) {
                    _this.observers[event] = _this.observers[event] || [];
                    _this.observers[event].push(listener);
                });
                return this;
            }
        },
        {
            key: "off",
            value: function off(event, listener) {
                if (!this.observers[event]) return;
                if (!listener) {
                    delete this.observers[event];
                    return;
                }
                this.observers[event] = this.observers[event].filter(function(l) {
                    return l !== listener;
                });
            }
        },
        {
            key: "emit",
            value: function emit(event) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                if (this.observers[event]) {
                    var cloned = [].concat(this.observers[event]);
                    cloned.forEach(function(observer) {
                        observer.apply(void 0, args);
                    });
                }
                if (this.observers["*"]) {
                    var _cloned = [].concat(this.observers["*"]);
                    _cloned.forEach(function(observer) {
                        observer.apply(observer, [
                            event
                        ].concat(args));
                    });
                }
            }
        }
    ]);
    return EventEmitter2;
}();
function defer() {
    var res;
    var rej;
    var promise = new Promise(function(resolve, reject) {
        res = resolve;
        rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
}
function makeString(object) {
    if (object == null) return "";
    return "" + object;
}
function copy(a, s, t2) {
    a.forEach(function(m) {
        if (s[m]) t2[m] = s[m];
    });
}
function getLastOfPath(object, path, Empty) {
    var cleanKey = function cleanKey(key2) {
        return key2 && key2.indexOf("###") > -1 ? key2.replace(/###/g, ".") : key2;
    };
    var canNotTraverseDeeper = function canNotTraverseDeeper() {
        return !object || typeof object === "string";
    };
    var stack = typeof path !== "string" ? [].concat(path) : path.split(".");
    while(stack.length > 1){
        if (canNotTraverseDeeper()) return {};
        var key = cleanKey(stack.shift());
        if (!object[key] && Empty) object[key] = new Empty();
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            object = object[key];
        } else {
            object = {};
        }
    }
    if (canNotTraverseDeeper()) return {};
    return {
        obj: object,
        k: cleanKey(stack.shift())
    };
}
function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object), obj = _getLastOfPath.obj, k = _getLastOfPath.k;
    obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object), obj = _getLastOfPath2.obj, k = _getLastOfPath2.k;
    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path), obj = _getLastOfPath3.obj, k = _getLastOfPath3.k;
    if (!obj) return void 0;
    return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
    var value = getPath(data, key);
    if (value !== void 0) {
        return value;
    }
    return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
    for(var prop in source){
        if (prop !== "__proto__" && prop !== "constructor") {
            if (prop in target) {
                if (typeof target[prop] === "string" || _instanceof(target[prop], String) || typeof source[prop] === "string" || _instanceof(source[prop], String)) {
                    if (overwrite) target[prop] = source[prop];
                } else {
                    deepExtend(target[prop], source[prop], overwrite);
                }
            } else {
                target[prop] = source[prop];
            }
        }
    }
    return target;
}
function regexEscape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var _entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
function escape(data) {
    if (typeof data === "string") {
        return data.replace(/[&<>"'\/]/g, function(s) {
            return _entityMap[s];
        });
    }
    return data;
}
var isIE10 = typeof window !== "undefined" && window.navigator && typeof window.navigator.userAgentData === "undefined" && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1;
var chars = [
    " ",
    ",",
    "?",
    "!",
    ";"
];
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
    nsSeparator = nsSeparator || "";
    keySeparator = keySeparator || "";
    var possibleChars = chars.filter(function(c) {
        return nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0;
    });
    if (possibleChars.length === 0) return true;
    var r = new RegExp("(".concat(possibleChars.map(function(c) {
        return c === "?" ? "\\?" : c;
    }).join("|"), ")"));
    var matched = !r.test(key);
    if (!matched) {
        var ki = key.indexOf(keySeparator);
        if (ki > 0 && !r.test(key.substring(0, ki))) {
            matched = true;
        }
    }
    return matched;
}
function deepFind(obj, path) {
    var keySeparator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
    if (!obj) return void 0;
    if (obj[path]) return obj[path];
    var paths = path.split(keySeparator);
    var current = obj;
    for(var i = 0; i < paths.length; ++i){
        if (!current) return void 0;
        if (typeof current[paths[i]] === "string" && i + 1 < paths.length) {
            return void 0;
        }
        if (current[paths[i]] === void 0) {
            var j = 2;
            var p = paths.slice(i, i + j).join(keySeparator);
            var mix2 = current[p];
            while(mix2 === void 0 && paths.length > i + j){
                j++;
                p = paths.slice(i, i + j).join(keySeparator);
                mix2 = current[p];
            }
            if (mix2 === void 0) return void 0;
            if (mix2 === null) return null;
            if (path.endsWith(p)) {
                if (typeof mix2 === "string") return mix2;
                if (p && typeof mix2[p] === "string") return mix2[p];
            }
            var joinedPath = paths.slice(i + j).join(keySeparator);
            if (joinedPath) return deepFind(mix2, joinedPath, keySeparator);
            return void 0;
        }
        current = current[paths[i]];
    }
    return current;
}
function ownKeys$5(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$5(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$5(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper$3(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _isNativeReflectConstruct$3() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var ResourceStore = function(_EventEmitter) {
    _inherits(ResourceStore2, _EventEmitter);
    var _super = _createSuper$3(ResourceStore2);
    function ResourceStore2(data) {
        var _this;
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            ns: [
                "translation"
            ],
            defaultNS: "translation"
        };
        _classCallCheck(this, ResourceStore2);
        _this = _super.call(this);
        if (isIE10) {
            EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.data = data || {};
        _this.options = options;
        if (_this.options.keySeparator === void 0) {
            _this.options.keySeparator = ".";
        }
        if (_this.options.ignoreJSONStructure === void 0) {
            _this.options.ignoreJSONStructure = true;
        }
        return _this;
    }
    _createClass(ResourceStore2, [
        {
            key: "addNamespaces",
            value: function addNamespaces(ns) {
                if (this.options.ns.indexOf(ns) < 0) {
                    this.options.ns.push(ns);
                }
            }
        },
        {
            key: "removeNamespaces",
            value: function removeNamespaces(ns) {
                var index = this.options.ns.indexOf(ns);
                if (index > -1) {
                    this.options.ns.splice(index, 1);
                }
            }
        },
        {
            key: "getResource",
            value: function getResource(lng, ns, key) {
                var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                var keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
                var ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
                var path = [
                    lng,
                    ns
                ];
                if (key && typeof key !== "string") path = path.concat(key);
                if (key && typeof key === "string") path = path.concat(keySeparator ? key.split(keySeparator) : key);
                if (lng.indexOf(".") > -1) {
                    path = lng.split(".");
                }
                var result = getPath(this.data, path);
                if (result || !ignoreJSONStructure || typeof key !== "string") return result;
                return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
            }
        },
        {
            key: "addResource",
            value: function addResource(lng, ns, key, value) {
                var options = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
                    silent: false
                };
                var keySeparator = this.options.keySeparator;
                if (keySeparator === void 0) keySeparator = ".";
                var path = [
                    lng,
                    ns
                ];
                if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
                if (lng.indexOf(".") > -1) {
                    path = lng.split(".");
                    value = ns;
                    ns = path[1];
                }
                this.addNamespaces(ns);
                setPath(this.data, path, value);
                if (!options.silent) this.emit("added", lng, ns, key, value);
            }
        },
        {
            key: "addResources",
            value: function addResources(lng, ns, resources) {
                var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
                    silent: false
                };
                for(var m in resources){
                    if (typeof resources[m] === "string" || Object.prototype.toString.apply(resources[m]) === "[object Array]") this.addResource(lng, ns, m, resources[m], {
                        silent: true
                    });
                }
                if (!options.silent) this.emit("added", lng, ns, resources);
            }
        },
        {
            key: "addResourceBundle",
            value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
                var options = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
                    silent: false
                };
                var path = [
                    lng,
                    ns
                ];
                if (lng.indexOf(".") > -1) {
                    path = lng.split(".");
                    deep = resources;
                    resources = ns;
                    ns = path[1];
                }
                this.addNamespaces(ns);
                var pack = getPath(this.data, path) || {};
                if (deep) {
                    deepExtend(pack, resources, overwrite);
                } else {
                    pack = _objectSpread$5(_objectSpread$5({}, pack), resources);
                }
                setPath(this.data, path, pack);
                if (!options.silent) this.emit("added", lng, ns, resources);
            }
        },
        {
            key: "removeResourceBundle",
            value: function removeResourceBundle(lng, ns) {
                if (this.hasResourceBundle(lng, ns)) {
                    delete this.data[lng][ns];
                }
                this.removeNamespaces(ns);
                this.emit("removed", lng, ns);
            }
        },
        {
            key: "hasResourceBundle",
            value: function hasResourceBundle(lng, ns) {
                return this.getResource(lng, ns) !== void 0;
            }
        },
        {
            key: "getResourceBundle",
            value: function getResourceBundle(lng, ns) {
                if (!ns) ns = this.options.defaultNS;
                if (this.options.compatibilityAPI === "v1") return _objectSpread$5(_objectSpread$5({}, {}), this.getResource(lng, ns));
                return this.getResource(lng, ns);
            }
        },
        {
            key: "getDataByLanguage",
            value: function getDataByLanguage(lng) {
                return this.data[lng];
            }
        },
        {
            key: "hasLanguageSomeTranslations",
            value: function hasLanguageSomeTranslations(lng) {
                var data = this.getDataByLanguage(lng);
                var n = data && Object.keys(data) || [];
                return !!n.find(function(v) {
                    return data[v] && Object.keys(data[v]).length > 0;
                });
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return this.data;
            }
        }
    ]);
    return ResourceStore2;
}(EventEmitter);
var postProcessor = {
    processors: {},
    addPostProcessor: function addPostProcessor(module2) {
        this.processors[module2.name] = module2;
    },
    handle: function handle(processors, value, key, options, translator) {
        var _this = this;
        processors.forEach(function(processor) {
            if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
        });
        return value;
    }
};
function ownKeys$4(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$4(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$4(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper$2(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _isNativeReflectConstruct$2() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var checkedLoadedFor = {};
var Translator = function(_EventEmitter) {
    _inherits(Translator2, _EventEmitter);
    var _super = _createSuper$2(Translator2);
    function Translator2(services) {
        var _this;
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, Translator2);
        _this = _super.call(this);
        if (isIE10) {
            EventEmitter.call(_assertThisInitialized(_this));
        }
        copy([
            "resourceStore",
            "languageUtils",
            "pluralResolver",
            "interpolator",
            "backendConnector",
            "i18nFormat",
            "utils"
        ], services, _assertThisInitialized(_this));
        _this.options = options;
        if (_this.options.keySeparator === void 0) {
            _this.options.keySeparator = ".";
        }
        _this.logger = baseLogger.create("translator");
        return _this;
    }
    _createClass(Translator2, [
        {
            key: "changeLanguage",
            value: function changeLanguage2(lng) {
                if (lng) this.language = lng;
            }
        },
        {
            key: "exists",
            value: function exists2(key) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    interpolation: {}
                };
                if (key === void 0 || key === null) {
                    return false;
                }
                var resolved = this.resolve(key, options);
                return resolved && resolved.res !== void 0;
            }
        },
        {
            key: "extractFromKey",
            value: function extractFromKey(key, options) {
                var nsSeparator = options.nsSeparator !== void 0 ? options.nsSeparator : this.options.nsSeparator;
                if (nsSeparator === void 0) nsSeparator = ":";
                var keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
                var namespaces = options.ns || this.options.defaultNS || [];
                var wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
                var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
                if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
                    var m = key.match(this.interpolator.nestingRegexp);
                    if (m && m.length > 0) {
                        return {
                            key: key,
                            namespaces: namespaces
                        };
                    }
                    var parts = key.split(nsSeparator);
                    if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
                    key = parts.join(keySeparator);
                }
                if (typeof namespaces === "string") namespaces = [
                    namespaces
                ];
                return {
                    key: key,
                    namespaces: namespaces
                };
            }
        },
        {
            key: "translate",
            value: function translate(keys, options, lastKey) {
                var _this2 = this;
                if (_typeof(options) !== "object" && this.options.overloadTranslationOptionHandler) {
                    options = this.options.overloadTranslationOptionHandler(arguments);
                }
                if (!options) options = {};
                if (keys === void 0 || keys === null) return "";
                if (!Array.isArray(keys)) keys = [
                    String(keys)
                ];
                var returnDetails = options.returnDetails !== void 0 ? options.returnDetails : this.options.returnDetails;
                var keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
                var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options), key = _this$extractFromKey.key, namespaces = _this$extractFromKey.namespaces;
                var namespace = namespaces[namespaces.length - 1];
                var lng = options.lng || this.language;
                var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                if (lng && lng.toLowerCase() === "cimode") {
                    if (appendNamespaceToCIMode) {
                        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
                        if (returnDetails) {
                            return {
                                res: "".concat(namespace).concat(nsSeparator).concat(key),
                                usedKey: key,
                                exactUsedKey: key,
                                usedLng: lng,
                                usedNS: namespace
                            };
                        }
                        return "".concat(namespace).concat(nsSeparator).concat(key);
                    }
                    if (returnDetails) {
                        return {
                            res: key,
                            usedKey: key,
                            exactUsedKey: key,
                            usedLng: lng,
                            usedNS: namespace
                        };
                    }
                    return key;
                }
                var resolved = this.resolve(keys, options);
                var res = resolved && resolved.res;
                var resUsedKey = resolved && resolved.usedKey || key;
                var resExactUsedKey = resolved && resolved.exactUsedKey || key;
                var resType = Object.prototype.toString.apply(res);
                var noObject = [
                    "[object Number]",
                    "[object Function]",
                    "[object RegExp]"
                ];
                var joinArrays = options.joinArrays !== void 0 ? options.joinArrays : this.options.joinArrays;
                var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
                var handleAsObject = typeof res !== "string" && typeof res !== "boolean" && typeof res !== "number";
                if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === "string" && resType === "[object Array]")) {
                    if (!options.returnObjects && !this.options.returnObjects) {
                        if (!this.options.returnedObjectHandler) {
                            this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                        }
                        var r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread$4(_objectSpread$4({}, options), {}, {
                            ns: namespaces
                        })) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
                        if (returnDetails) {
                            resolved.res = r;
                            return resolved;
                        }
                        return r;
                    }
                    if (keySeparator) {
                        var resTypeIsArray = resType === "[object Array]";
                        var copy2 = resTypeIsArray ? [] : {};
                        var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
                        for(var m in res){
                            if (Object.prototype.hasOwnProperty.call(res, m)) {
                                var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
                                copy2[m] = this.translate(deepKey, _objectSpread$4(_objectSpread$4({}, options), {
                                    joinArrays: false,
                                    ns: namespaces
                                }));
                                if (copy2[m] === deepKey) copy2[m] = res[m];
                            }
                        }
                        res = copy2;
                    }
                } else if (handleAsObjectInI18nFormat && typeof joinArrays === "string" && resType === "[object Array]") {
                    res = res.join(joinArrays);
                    if (res) res = this.extendTranslation(res, keys, options, lastKey);
                } else {
                    var usedDefault = false;
                    var usedKey = false;
                    var needsPluralHandling = options.count !== void 0 && typeof options.count !== "string";
                    var hasDefaultValue = Translator2.hasDefaultValue(options);
                    var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : "";
                    var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;
                    if (!this.isValidLookup(res) && hasDefaultValue) {
                        usedDefault = true;
                        res = defaultValue;
                    }
                    if (!this.isValidLookup(res)) {
                        usedKey = true;
                        res = key;
                    }
                    var missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
                    var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
                    var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
                    if (usedKey || usedDefault || updateMissing) {
                        this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
                        if (keySeparator) {
                            var fk = this.resolve(key, _objectSpread$4(_objectSpread$4({}, options), {}, {
                                keySeparator: false
                            }));
                            if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
                        }
                        var lngs = [];
                        var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
                        if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
                            for(var i = 0; i < fallbackLngs.length; i++){
                                lngs.push(fallbackLngs[i]);
                            }
                        } else if (this.options.saveMissingTo === "all") {
                            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
                        } else {
                            lngs.push(options.lng || this.language);
                        }
                        var send = function send2(l, k, specificDefaultValue) {
                            var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
                            if (_this2.options.missingKeyHandler) {
                                _this2.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
                            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
                                _this2.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
                            }
                            _this2.emit("missingKey", l, namespace, k, res);
                        };
                        if (this.options.saveMissing) {
                            if (this.options.saveMissingPlurals && needsPluralHandling) {
                                lngs.forEach(function(language) {
                                    _this2.pluralResolver.getSuffixes(language, options).forEach(function(suffix) {
                                        send([
                                            language
                                        ], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                                    });
                                });
                            } else {
                                send(lngs, key, defaultValue);
                            }
                        }
                    }
                    res = this.extendTranslation(res, keys, options, resolved, lastKey);
                    if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
                    if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
                        if (this.options.compatibilityAPI !== "v1") {
                            res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key) : key, usedDefault ? res : void 0);
                        } else {
                            res = this.options.parseMissingKeyHandler(res);
                        }
                    }
                }
                if (returnDetails) {
                    resolved.res = res;
                    return resolved;
                }
                return res;
            }
        },
        {
            key: "extendTranslation",
            value: function extendTranslation(res, key, options, resolved, lastKey) {
                var _this3 = this;
                if (this.i18nFormat && this.i18nFormat.parse) {
                    res = this.i18nFormat.parse(res, _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), options), resolved.usedLng, resolved.usedNS, resolved.usedKey, {
                        resolved: resolved
                    });
                } else if (!options.skipInterpolation) {
                    if (options.interpolation) this.interpolator.init(_objectSpread$4(_objectSpread$4({}, options), {
                        interpolation: _objectSpread$4(_objectSpread$4({}, this.options.interpolation), options.interpolation)
                    }));
                    var skipOnVariables = typeof res === "string" && (options && options.interpolation && options.interpolation.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                    var nestBef;
                    if (skipOnVariables) {
                        var nb = res.match(this.interpolator.nestingRegexp);
                        nestBef = nb && nb.length;
                    }
                    var data = options.replace && typeof options.replace !== "string" ? options.replace : options;
                    if (this.options.interpolation.defaultVariables) data = _objectSpread$4(_objectSpread$4({}, this.options.interpolation.defaultVariables), data);
                    res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
                    if (skipOnVariables) {
                        var na = res.match(this.interpolator.nestingRegexp);
                        var nestAft = na && na.length;
                        if (nestBef < nestAft) options.nest = false;
                    }
                    if (!options.lng && this.options.compatibilityAPI !== "v1" && resolved && resolved.res) options.lng = resolved.usedLng;
                    if (options.nest !== false) res = this.interpolator.nest(res, function() {
                        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                            args[_key] = arguments[_key];
                        }
                        if (lastKey && lastKey[0] === args[0] && !options.context) {
                            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));
                            return null;
                        }
                        return _this3.translate.apply(_this3, args.concat([
                            key
                        ]));
                    }, options);
                    if (options.interpolation) this.interpolator.reset();
                }
                var postProcess = options.postProcess || this.options.postProcess;
                var postProcessorNames = typeof postProcess === "string" ? [
                    postProcess
                ] : postProcess;
                if (res !== void 0 && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
                    res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread$4({
                        i18nResolved: resolved
                    }, options) : options, this);
                }
                return res;
            }
        },
        {
            key: "resolve",
            value: function resolve(keys) {
                var _this4 = this;
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var found;
                var usedKey;
                var exactUsedKey;
                var usedLng;
                var usedNS;
                if (typeof keys === "string") keys = [
                    keys
                ];
                keys.forEach(function(k) {
                    if (_this4.isValidLookup(found)) return;
                    var extracted = _this4.extractFromKey(k, options);
                    var key = extracted.key;
                    usedKey = key;
                    var namespaces = extracted.namespaces;
                    if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
                    var needsPluralHandling = options.count !== void 0 && typeof options.count !== "string";
                    var needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && _this4.pluralResolver.shouldUseIntlApi();
                    var needsContextHandling = options.context !== void 0 && (typeof options.context === "string" || typeof options.context === "number") && options.context !== "";
                    var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
                    namespaces.forEach(function(ns) {
                        if (_this4.isValidLookup(found)) return;
                        usedNS = ns;
                        if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
                            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
                            _this4.logger.warn('key "'.concat(usedKey, '" for languages "').concat(codes.join(", "), '" won\'t get resolved as namespace "').concat(usedNS, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
                        }
                        codes.forEach(function(code) {
                            if (_this4.isValidLookup(found)) return;
                            usedLng = code;
                            var finalKeys = [
                                key
                            ];
                            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
                                _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
                            } else {
                                var pluralSuffix;
                                if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count, options);
                                var zeroSuffix = "".concat(_this4.options.pluralSeparator, "zero");
                                if (needsPluralHandling) {
                                    finalKeys.push(key + pluralSuffix);
                                    if (needsZeroSuffixLookup) {
                                        finalKeys.push(key + zeroSuffix);
                                    }
                                }
                                if (needsContextHandling) {
                                    var contextKey = "".concat(key).concat(_this4.options.contextSeparator).concat(options.context);
                                    finalKeys.push(contextKey);
                                    if (needsPluralHandling) {
                                        finalKeys.push(contextKey + pluralSuffix);
                                        if (needsZeroSuffixLookup) {
                                            finalKeys.push(contextKey + zeroSuffix);
                                        }
                                    }
                                }
                            }
                            var possibleKey;
                            while(possibleKey = finalKeys.pop()){
                                if (!_this4.isValidLookup(found)) {
                                    exactUsedKey = possibleKey;
                                    found = _this4.getResource(code, ns, possibleKey, options);
                                }
                            }
                        });
                    });
                });
                return {
                    res: found,
                    usedKey: usedKey,
                    exactUsedKey: exactUsedKey,
                    usedLng: usedLng,
                    usedNS: usedNS
                };
            }
        },
        {
            key: "isValidLookup",
            value: function isValidLookup(res) {
                return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
            }
        },
        {
            key: "getResource",
            value: function getResource(code, ns, key) {
                var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
                return this.resourceStore.getResource(code, ns, key, options);
            }
        }
    ], [
        {
            key: "hasDefaultValue",
            value: function hasDefaultValue(options) {
                var prefix = "defaultValue";
                for(var option in options){
                    if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && void 0 !== options[option]) {
                        return true;
                    }
                }
                return false;
            }
        }
    ]);
    return Translator2;
}(EventEmitter);
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var LanguageUtil = function() {
    function LanguageUtil2(options) {
        _classCallCheck(this, LanguageUtil2);
        this.options = options;
        this.supportedLngs = this.options.supportedLngs || false;
        this.logger = baseLogger.create("languageUtils");
    }
    _createClass(LanguageUtil2, [
        {
            key: "getScriptPartFromCode",
            value: function getScriptPartFromCode(code) {
                if (!code || code.indexOf("-") < 0) return null;
                var p = code.split("-");
                if (p.length === 2) return null;
                p.pop();
                if (p[p.length - 1].toLowerCase() === "x") return null;
                return this.formatLanguageCode(p.join("-"));
            }
        },
        {
            key: "getLanguagePartFromCode",
            value: function getLanguagePartFromCode(code) {
                if (!code || code.indexOf("-") < 0) return code;
                var p = code.split("-");
                return this.formatLanguageCode(p[0]);
            }
        },
        {
            key: "formatLanguageCode",
            value: function formatLanguageCode(code) {
                if (typeof code === "string" && code.indexOf("-") > -1) {
                    var specialCases = [
                        "hans",
                        "hant",
                        "latn",
                        "cyrl",
                        "cans",
                        "mong",
                        "arab"
                    ];
                    var p = code.split("-");
                    if (this.options.lowerCaseLng) {
                        p = p.map(function(part) {
                            return part.toLowerCase();
                        });
                    } else if (p.length === 2) {
                        p[0] = p[0].toLowerCase();
                        p[1] = p[1].toUpperCase();
                        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
                    } else if (p.length === 3) {
                        p[0] = p[0].toLowerCase();
                        if (p[1].length === 2) p[1] = p[1].toUpperCase();
                        if (p[0] !== "sgn" && p[2].length === 2) p[2] = p[2].toUpperCase();
                        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
                        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
                    }
                    return p.join("-");
                }
                return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
            }
        },
        {
            key: "isSupportedCode",
            value: function isSupportedCode(code) {
                if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
                    code = this.getLanguagePartFromCode(code);
                }
                return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
            }
        },
        {
            key: "getBestMatchFromCodes",
            value: function getBestMatchFromCodes(codes) {
                var _this = this;
                if (!codes) return null;
                var found;
                codes.forEach(function(code) {
                    if (found) return;
                    var cleanedLng = _this.formatLanguageCode(code);
                    if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
                });
                if (!found && this.options.supportedLngs) {
                    codes.forEach(function(code) {
                        if (found) return;
                        var lngOnly = _this.getLanguagePartFromCode(code);
                        if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
                        found = _this.options.supportedLngs.find(function(supportedLng) {
                            if (supportedLng === lngOnly) return supportedLng;
                            if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0) return;
                            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
                        });
                    });
                }
                if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
                return found;
            }
        },
        {
            key: "getFallbackCodes",
            value: function getFallbackCodes(fallbacks, code) {
                if (!fallbacks) return [];
                if (typeof fallbacks === "function") fallbacks = fallbacks(code);
                if (typeof fallbacks === "string") fallbacks = [
                    fallbacks
                ];
                if (Object.prototype.toString.apply(fallbacks) === "[object Array]") return fallbacks;
                if (!code) return fallbacks["default"] || [];
                var found = fallbacks[code];
                if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
                if (!found) found = fallbacks[this.formatLanguageCode(code)];
                if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
                if (!found) found = fallbacks["default"];
                return found || [];
            }
        },
        {
            key: "toResolveHierarchy",
            value: function toResolveHierarchy(code, fallbackCode) {
                var _this2 = this;
                var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
                var codes = [];
                var addCode = function addCode2(c) {
                    if (!c) return;
                    if (_this2.isSupportedCode(c)) {
                        codes.push(c);
                    } else {
                        _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
                    }
                };
                if (typeof code === "string" && code.indexOf("-") > -1) {
                    if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
                    if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
                    if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
                } else if (typeof code === "string") {
                    addCode(this.formatLanguageCode(code));
                }
                fallbackCodes.forEach(function(fc) {
                    if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
                });
                return codes;
            }
        }
    ]);
    return LanguageUtil2;
}();
var sets = [
    {
        lngs: [
            "ach",
            "ak",
            "am",
            "arn",
            "br",
            "fil",
            "gun",
            "ln",
            "mfe",
            "mg",
            "mi",
            "oc",
            "pt",
            "pt-BR",
            "tg",
            "tl",
            "ti",
            "tr",
            "uz",
            "wa"
        ],
        nr: [
            1,
            2
        ],
        fc: 1
    },
    {
        lngs: [
            "af",
            "an",
            "ast",
            "az",
            "bg",
            "bn",
            "ca",
            "da",
            "de",
            "dev",
            "el",
            "en",
            "eo",
            "es",
            "et",
            "eu",
            "fi",
            "fo",
            "fur",
            "fy",
            "gl",
            "gu",
            "ha",
            "hi",
            "hu",
            "hy",
            "ia",
            "it",
            "kk",
            "kn",
            "ku",
            "lb",
            "mai",
            "ml",
            "mn",
            "mr",
            "nah",
            "nap",
            "nb",
            "ne",
            "nl",
            "nn",
            "no",
            "nso",
            "pa",
            "pap",
            "pms",
            "ps",
            "pt-PT",
            "rm",
            "sco",
            "se",
            "si",
            "so",
            "son",
            "sq",
            "sv",
            "sw",
            "ta",
            "te",
            "tk",
            "ur",
            "yo"
        ],
        nr: [
            1,
            2
        ],
        fc: 2
    },
    {
        lngs: [
            "ay",
            "bo",
            "cgg",
            "fa",
            "ht",
            "id",
            "ja",
            "jbo",
            "ka",
            "km",
            "ko",
            "ky",
            "lo",
            "ms",
            "sah",
            "su",
            "th",
            "tt",
            "ug",
            "vi",
            "wo",
            "zh"
        ],
        nr: [
            1
        ],
        fc: 3
    },
    {
        lngs: [
            "be",
            "bs",
            "cnr",
            "dz",
            "hr",
            "ru",
            "sr",
            "uk"
        ],
        nr: [
            1,
            2,
            5
        ],
        fc: 4
    },
    {
        lngs: [
            "ar"
        ],
        nr: [
            0,
            1,
            2,
            3,
            11,
            100
        ],
        fc: 5
    },
    {
        lngs: [
            "cs",
            "sk"
        ],
        nr: [
            1,
            2,
            5
        ],
        fc: 6
    },
    {
        lngs: [
            "csb",
            "pl"
        ],
        nr: [
            1,
            2,
            5
        ],
        fc: 7
    },
    {
        lngs: [
            "cy"
        ],
        nr: [
            1,
            2,
            3,
            8
        ],
        fc: 8
    },
    {
        lngs: [
            "fr"
        ],
        nr: [
            1,
            2
        ],
        fc: 9
    },
    {
        lngs: [
            "ga"
        ],
        nr: [
            1,
            2,
            3,
            7,
            11
        ],
        fc: 10
    },
    {
        lngs: [
            "gd"
        ],
        nr: [
            1,
            2,
            3,
            20
        ],
        fc: 11
    },
    {
        lngs: [
            "is"
        ],
        nr: [
            1,
            2
        ],
        fc: 12
    },
    {
        lngs: [
            "jv"
        ],
        nr: [
            0,
            1
        ],
        fc: 13
    },
    {
        lngs: [
            "kw"
        ],
        nr: [
            1,
            2,
            3,
            4
        ],
        fc: 14
    },
    {
        lngs: [
            "lt"
        ],
        nr: [
            1,
            2,
            10
        ],
        fc: 15
    },
    {
        lngs: [
            "lv"
        ],
        nr: [
            1,
            2,
            0
        ],
        fc: 16
    },
    {
        lngs: [
            "mk"
        ],
        nr: [
            1,
            2
        ],
        fc: 17
    },
    {
        lngs: [
            "mnk"
        ],
        nr: [
            0,
            1,
            2
        ],
        fc: 18
    },
    {
        lngs: [
            "mt"
        ],
        nr: [
            1,
            2,
            11,
            20
        ],
        fc: 19
    },
    {
        lngs: [
            "or"
        ],
        nr: [
            2,
            1
        ],
        fc: 2
    },
    {
        lngs: [
            "ro"
        ],
        nr: [
            1,
            2,
            20
        ],
        fc: 20
    },
    {
        lngs: [
            "sl"
        ],
        nr: [
            5,
            1,
            2,
            3
        ],
        fc: 21
    },
    {
        lngs: [
            "he",
            "iw"
        ],
        nr: [
            1,
            2,
            20,
            21
        ],
        fc: 22
    }
];
var _rulesPluralsTypes = {
    1: function _(n) {
        return Number(n > 1);
    },
    2: function _2(n) {
        return Number(n != 1);
    },
    3: function _3(n) {
        return 0;
    },
    4: function _4(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    5: function _5(n) {
        return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
    },
    6: function _6(n) {
        return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
    },
    7: function _7(n) {
        return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    8: function _8(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
    },
    9: function _9(n) {
        return Number(n >= 2);
    },
    10: function _10(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
    },
    11: function _11(n) {
        return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
    },
    12: function _12(n) {
        return Number(n % 10 != 1 || n % 100 == 11);
    },
    13: function _13(n) {
        return Number(n !== 0);
    },
    14: function _14(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
    },
    15: function _15(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    16: function _16(n) {
        return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
    },
    17: function _17(n) {
        return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
    },
    18: function _18(n) {
        return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
    },
    19: function _19(n) {
        return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
    },
    20: function _20(n) {
        return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
    },
    21: function _21(n) {
        return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
    },
    22: function _22(n) {
        return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
    }
};
var deprecatedJsonVersions = [
    "v1",
    "v2",
    "v3"
];
var suffixesOrder = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
};
function createRules() {
    var rules = {};
    sets.forEach(function(set) {
        set.lngs.forEach(function(l) {
            rules[l] = {
                numbers: set.nr,
                plurals: _rulesPluralsTypes[set.fc]
            };
        });
    });
    return rules;
}
var PluralResolver = function() {
    function PluralResolver2(languageUtils) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _classCallCheck(this, PluralResolver2);
        this.languageUtils = languageUtils;
        this.options = options;
        this.logger = baseLogger.create("pluralResolver");
        if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === "v4") && (typeof Intl === "undefined" || !Intl.PluralRules)) {
            this.options.compatibilityJSON = "v3";
            this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.");
        }
        this.rules = createRules();
    }
    _createClass(PluralResolver2, [
        {
            key: "addRule",
            value: function addRule(lng, obj) {
                this.rules[lng] = obj;
            }
        },
        {
            key: "getRule",
            value: function getRule(code) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                if (this.shouldUseIntlApi()) {
                    try {
                        return new Intl.PluralRules(code, {
                            type: options.ordinal ? "ordinal" : "cardinal"
                        });
                    } catch (_unused) {
                        return;
                    }
                }
                return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
            }
        },
        {
            key: "needsPlural",
            value: function needsPlural(code) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var rule = this.getRule(code, options);
                if (this.shouldUseIntlApi()) {
                    return rule && rule.resolvedOptions().pluralCategories.length > 1;
                }
                return rule && rule.numbers.length > 1;
            }
        },
        {
            key: "getPluralFormsOfKey",
            value: function getPluralFormsOfKey(code, key) {
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return this.getSuffixes(code, options).map(function(suffix) {
                    return "".concat(key).concat(suffix);
                });
            }
        },
        {
            key: "getSuffixes",
            value: function getSuffixes(code) {
                var _this = this;
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var rule = this.getRule(code, options);
                if (!rule) {
                    return [];
                }
                if (this.shouldUseIntlApi()) {
                    return rule.resolvedOptions().pluralCategories.sort(function(pluralCategory1, pluralCategory2) {
                        return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
                    }).map(function(pluralCategory) {
                        return "".concat(_this.options.prepend).concat(pluralCategory);
                    });
                }
                return rule.numbers.map(function(number) {
                    return _this.getSuffix(code, number, options);
                });
            }
        },
        {
            key: "getSuffix",
            value: function getSuffix(code, count) {
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var rule = this.getRule(code, options);
                if (rule) {
                    if (this.shouldUseIntlApi()) {
                        return "".concat(this.options.prepend).concat(rule.select(count));
                    }
                    return this.getSuffixRetroCompatible(rule, count);
                }
                this.logger.warn("no plural rule found for: ".concat(code));
                return "";
            }
        },
        {
            key: "getSuffixRetroCompatible",
            value: function getSuffixRetroCompatible(rule, count) {
                var _this2 = this;
                var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
                var suffix = rule.numbers[idx];
                if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
                    if (suffix === 2) {
                        suffix = "plural";
                    } else if (suffix === 1) {
                        suffix = "";
                    }
                }
                var returnSuffix = function returnSuffix2() {
                    return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
                };
                if (this.options.compatibilityJSON === "v1") {
                    if (suffix === 1) return "";
                    if (typeof suffix === "number") return "_plural_".concat(suffix.toString());
                    return returnSuffix();
                } else if (this.options.compatibilityJSON === "v2") {
                    return returnSuffix();
                } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
                    return returnSuffix();
                }
                return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
            }
        },
        {
            key: "shouldUseIntlApi",
            value: function shouldUseIntlApi() {
                return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
            }
        }
    ]);
    return PluralResolver2;
}();
function ownKeys$3(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$3(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$3(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function deepFindWithDefaults(data, defaultData, key) {
    var keySeparator = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".";
    var ignoreJSONStructure = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var path = getPathWithDefaults(data, defaultData, key);
    if (!path && ignoreJSONStructure && typeof key === "string") {
        path = deepFind(data, key, keySeparator);
        if (path === void 0) path = deepFind(defaultData, key, keySeparator);
    }
    return path;
}
var Interpolator = function() {
    function Interpolator2() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, Interpolator2);
        this.logger = baseLogger.create("interpolator");
        this.options = options;
        this.format = options.interpolation && options.interpolation.format || function(value) {
            return value;
        };
        this.init(options);
    }
    _createClass(Interpolator2, [
        {
            key: "init",
            value: function init2() {
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                if (!options.interpolation) options.interpolation = {
                    escapeValue: true
                };
                var iOpts = options.interpolation;
                this.escape = iOpts.escape !== void 0 ? iOpts.escape : escape;
                this.escapeValue = iOpts.escapeValue !== void 0 ? iOpts.escapeValue : true;
                this.useRawValueToEscape = iOpts.useRawValueToEscape !== void 0 ? iOpts.useRawValueToEscape : false;
                this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || "{{";
                this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || "}}";
                this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
                this.unescapePrefix = iOpts.unescapeSuffix ? "" : iOpts.unescapePrefix || "-";
                this.unescapeSuffix = this.unescapePrefix ? "" : iOpts.unescapeSuffix || "";
                this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape("$t(");
                this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(")");
                this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ",";
                this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1e3;
                this.alwaysFormat = iOpts.alwaysFormat !== void 0 ? iOpts.alwaysFormat : false;
                this.resetRegExp();
            }
        },
        {
            key: "reset",
            value: function reset() {
                if (this.options) this.init(this.options);
            }
        },
        {
            key: "resetRegExp",
            value: function resetRegExp() {
                var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
                this.regexp = new RegExp(regexpStr, "g");
                var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
                this.regexpUnescape = new RegExp(regexpUnescapeStr, "g");
                var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
                this.nestingRegexp = new RegExp(nestingRegexpStr, "g");
            }
        },
        {
            key: "interpolate",
            value: function interpolate(str, data, lng, options) {
                var regexSafe = function regexSafe(val) {
                    return val.replace(/\$/g, "$$$$");
                };
                var _this = this;
                var match;
                var value;
                var replaces;
                var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
                var handleFormat = function handleFormat2(key) {
                    if (key.indexOf(_this.formatSeparator) < 0) {
                        var path = deepFindWithDefaults(data, defaultData, key, _this.options.keySeparator, _this.options.ignoreJSONStructure);
                        return _this.alwaysFormat ? _this.format(path, void 0, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
                            interpolationkey: key
                        })) : path;
                    }
                    var p = key.split(_this.formatSeparator);
                    var k = p.shift().trim();
                    var f = p.join(_this.formatSeparator).trim();
                    return _this.format(deepFindWithDefaults(data, defaultData, k, _this.options.keySeparator, _this.options.ignoreJSONStructure), f, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), data), {}, {
                        interpolationkey: k
                    }));
                };
                this.resetRegExp();
                var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
                var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                var todos = [
                    {
                        regex: this.regexpUnescape,
                        safeValue: function safeValue(val) {
                            return regexSafe(val);
                        }
                    },
                    {
                        regex: this.regexp,
                        safeValue: function safeValue(val) {
                            return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
                        }
                    }
                ];
                todos.forEach(function(todo) {
                    replaces = 0;
                    while(match = todo.regex.exec(str)){
                        var matchedVar = match[1].trim();
                        value = handleFormat(matchedVar);
                        if (value === void 0) {
                            if (typeof missingInterpolationHandler === "function") {
                                var temp = missingInterpolationHandler(str, match, options);
                                value = typeof temp === "string" ? temp : "";
                            } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
                                value = "";
                            } else if (skipOnVariables) {
                                value = match[0];
                                continue;
                            } else {
                                _this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
                                value = "";
                            }
                        } else if (typeof value !== "string" && !_this.useRawValueToEscape) {
                            value = makeString(value);
                        }
                        var safeValue = todo.safeValue(value);
                        str = str.replace(match[0], safeValue);
                        if (skipOnVariables) {
                            todo.regex.lastIndex += value.length;
                            todo.regex.lastIndex -= match[0].length;
                        } else {
                            todo.regex.lastIndex = 0;
                        }
                        replaces++;
                        if (replaces >= _this.maxReplaces) {
                            break;
                        }
                    }
                });
                return str;
            }
        },
        {
            key: "nest",
            value: function nest(str, fc) {
                var handleHasOptions = function handleHasOptions(key, inheritedOptions) {
                    var sep = this.nestingOptionsSeparator;
                    if (key.indexOf(sep) < 0) return key;
                    var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
                    var optionsString = "{".concat(c[1]);
                    key = c[0];
                    optionsString = this.interpolate(optionsString, clonedOptions);
                    var matchedSingleQuotes = optionsString.match(/'/g);
                    var matchedDoubleQuotes = optionsString.match(/"/g);
                    if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
                        optionsString = optionsString.replace(/'/g, '"');
                    }
                    try {
                        clonedOptions = JSON.parse(optionsString);
                        if (inheritedOptions) clonedOptions = _objectSpread$3(_objectSpread$3({}, inheritedOptions), clonedOptions);
                    } catch (e) {
                        this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
                        return "".concat(key).concat(sep).concat(optionsString);
                    }
                    delete clonedOptions.defaultValue;
                    return key;
                };
                var _this2 = this;
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var match;
                var value;
                var clonedOptions;
                while(match = this.nestingRegexp.exec(str)){
                    var formatters = [];
                    clonedOptions = _objectSpread$3({}, options);
                    clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== "string" ? clonedOptions.replace : clonedOptions;
                    clonedOptions.applyPostProcessor = false;
                    delete clonedOptions.defaultValue;
                    var doReduce = false;
                    if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
                        var r = match[1].split(this.formatSeparator).map(function(elem) {
                            return elem.trim();
                        });
                        match[1] = r.shift();
                        formatters = r;
                        doReduce = true;
                    }
                    value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
                    if (value && match[0] === str && typeof value !== "string") return value;
                    if (typeof value !== "string") value = makeString(value);
                    if (!value) {
                        this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
                        value = "";
                    }
                    if (doReduce) {
                        value = formatters.reduce(function(v, f) {
                            return _this2.format(v, f, options.lng, _objectSpread$3(_objectSpread$3({}, options), {}, {
                                interpolationkey: match[1].trim()
                            }));
                        }, value.trim());
                    }
                    str = str.replace(match[0], value);
                    this.regexp.lastIndex = 0;
                }
                return str;
            }
        }
    ]);
    return Interpolator2;
}();
function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function parseFormatStr(formatStr) {
    var formatName = formatStr.toLowerCase().trim();
    var formatOptions = {};
    if (formatStr.indexOf("(") > -1) {
        var p = formatStr.split("(");
        formatName = p[0].toLowerCase().trim();
        var optStr = p[1].substring(0, p[1].length - 1);
        if (formatName === "currency" && optStr.indexOf(":") < 0) {
            if (!formatOptions.currency) formatOptions.currency = optStr.trim();
        } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
            if (!formatOptions.range) formatOptions.range = optStr.trim();
        } else {
            var opts = optStr.split(";");
            opts.forEach(function(opt) {
                if (!opt) return;
                var _opt$split = opt.split(":"), _opt$split2 = _toArray(_opt$split), key = _opt$split2[0], rest = _opt$split2.slice(1);
                var val = rest.join(":").trim().replace(/^'+|'+$/g, "");
                if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
                if (val === "false") formatOptions[key.trim()] = false;
                if (val === "true") formatOptions[key.trim()] = true;
                if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
            });
        }
    }
    return {
        formatName: formatName,
        formatOptions: formatOptions
    };
}
function createCachedFormatter(fn) {
    var cache = {};
    return function invokeFormatter(val, lng, options) {
        var key = lng + JSON.stringify(options);
        var formatter = cache[key];
        if (!formatter) {
            formatter = fn(lng, options);
            cache[key] = formatter;
        }
        return formatter(val);
    };
}
var Formatter = function() {
    function Formatter2() {
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, Formatter2);
        this.logger = baseLogger.create("formatter");
        this.options = options;
        this.formats = {
            number: createCachedFormatter(function(lng, opt) {
                var formatter = new Intl.NumberFormat(lng, _objectSpread$2({}, opt));
                return function(val) {
                    return formatter.format(val);
                };
            }),
            currency: createCachedFormatter(function(lng, opt) {
                var formatter = new Intl.NumberFormat(lng, _objectSpread$2(_objectSpread$2({}, opt), {}, {
                    style: "currency"
                }));
                return function(val) {
                    return formatter.format(val);
                };
            }),
            datetime: createCachedFormatter(function(lng, opt) {
                var formatter = new Intl.DateTimeFormat(lng, _objectSpread$2({}, opt));
                return function(val) {
                    return formatter.format(val);
                };
            }),
            relativetime: createCachedFormatter(function(lng, opt) {
                var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread$2({}, opt));
                return function(val) {
                    return formatter.format(val, opt.range || "day");
                };
            }),
            list: createCachedFormatter(function(lng, opt) {
                var formatter = new Intl.ListFormat(lng, _objectSpread$2({}, opt));
                return function(val) {
                    return formatter.format(val);
                };
            })
        };
        this.init(options);
    }
    _createClass(Formatter2, [
        {
            key: "init",
            value: function init2(services) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                    interpolation: {}
                };
                var iOpts = options.interpolation;
                this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
            }
        },
        {
            key: "add",
            value: function add(name, fc) {
                this.formats[name.toLowerCase().trim()] = fc;
            }
        },
        {
            key: "addCached",
            value: function addCached(name, fc) {
                this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
            }
        },
        {
            key: "format",
            value: function format(value, _format, lng) {
                var _this = this;
                var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                var formats = _format.split(this.formatSeparator);
                var result = formats.reduce(function(mem, f) {
                    var _parseFormatStr = parseFormatStr(f), formatName = _parseFormatStr.formatName, formatOptions = _parseFormatStr.formatOptions;
                    if (_this.formats[formatName]) {
                        var formatted = mem;
                        try {
                            var valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
                            var l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
                            formatted = _this.formats[formatName](mem, l, _objectSpread$2(_objectSpread$2(_objectSpread$2({}, formatOptions), options), valOptions));
                        } catch (error2) {
                            _this.logger.warn(error2);
                        }
                        return formatted;
                    } else {
                        _this.logger.warn("there was no format function for ".concat(formatName));
                    }
                    return mem;
                }, value);
                return result;
            }
        }
    ]);
    return Formatter2;
}();
function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread$1(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper$1(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _isNativeReflectConstruct$1() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function removePending(q, name) {
    if (q.pending[name] !== void 0) {
        delete q.pending[name];
        q.pendingCount--;
    }
}
var Connector = function(_EventEmitter) {
    _inherits(Connector2, _EventEmitter);
    var _super = _createSuper$1(Connector2);
    function Connector2(backend, store, services) {
        var _this;
        var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        _classCallCheck(this, Connector2);
        _this = _super.call(this);
        if (isIE10) {
            EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.backend = backend;
        _this.store = store;
        _this.services = services;
        _this.languageUtils = services.languageUtils;
        _this.options = options;
        _this.logger = baseLogger.create("backendConnector");
        _this.waitingReads = [];
        _this.maxParallelReads = options.maxParallelReads || 10;
        _this.readingCalls = 0;
        _this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
        _this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
        _this.state = {};
        _this.queue = [];
        if (_this.backend && _this.backend.init) {
            _this.backend.init(services, options.backend, options);
        }
        return _this;
    }
    _createClass(Connector2, [
        {
            key: "queueLoad",
            value: function queueLoad(languages, namespaces, options, callback) {
                var _this2 = this;
                var toLoad = {};
                var pending = {};
                var toLoadLanguages = {};
                var toLoadNamespaces = {};
                languages.forEach(function(lng) {
                    var hasAllNamespaces = true;
                    namespaces.forEach(function(ns) {
                        var name = "".concat(lng, "|").concat(ns);
                        if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
                            _this2.state[name] = 2;
                        } else if (_this2.state[name] < 0) ;
                        else if (_this2.state[name] === 1) {
                            if (pending[name] === void 0) pending[name] = true;
                        } else {
                            _this2.state[name] = 1;
                            hasAllNamespaces = false;
                            if (pending[name] === void 0) pending[name] = true;
                            if (toLoad[name] === void 0) toLoad[name] = true;
                            if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
                        }
                    });
                    if (!hasAllNamespaces) toLoadLanguages[lng] = true;
                });
                if (Object.keys(toLoad).length || Object.keys(pending).length) {
                    this.queue.push({
                        pending: pending,
                        pendingCount: Object.keys(pending).length,
                        loaded: {},
                        errors: [],
                        callback: callback
                    });
                }
                return {
                    toLoad: Object.keys(toLoad),
                    pending: Object.keys(pending),
                    toLoadLanguages: Object.keys(toLoadLanguages),
                    toLoadNamespaces: Object.keys(toLoadNamespaces)
                };
            }
        },
        {
            key: "loaded",
            value: function loaded(name, err, data) {
                var s = name.split("|");
                var lng = s[0];
                var ns = s[1];
                if (err) this.emit("failedLoading", lng, ns, err);
                if (data) {
                    this.store.addResourceBundle(lng, ns, data);
                }
                this.state[name] = err ? -1 : 2;
                var loaded2 = {};
                this.queue.forEach(function(q) {
                    pushPath(q.loaded, [
                        lng
                    ], ns);
                    removePending(q, name);
                    if (err) q.errors.push(err);
                    if (q.pendingCount === 0 && !q.done) {
                        Object.keys(q.loaded).forEach(function(l) {
                            if (!loaded2[l]) loaded2[l] = {};
                            var loadedKeys = q.loaded[l];
                            if (loadedKeys.length) {
                                loadedKeys.forEach(function(n) {
                                    if (loaded2[l][n] === void 0) loaded2[l][n] = true;
                                });
                            }
                        });
                        q.done = true;
                        if (q.errors.length) {
                            q.callback(q.errors);
                        } else {
                            q.callback();
                        }
                    }
                });
                this.emit("loaded", loaded2);
                this.queue = this.queue.filter(function(q) {
                    return !q.done;
                });
            }
        },
        {
            key: "read",
            value: function read(lng, ns, fcName) {
                var _this3 = this;
                var tried = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
                var wait = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout;
                var callback = arguments.length > 5 ? arguments[5] : void 0;
                if (!lng.length) return callback(null, {});
                if (this.readingCalls >= this.maxParallelReads) {
                    this.waitingReads.push({
                        lng: lng,
                        ns: ns,
                        fcName: fcName,
                        tried: tried,
                        wait: wait,
                        callback: callback
                    });
                    return;
                }
                this.readingCalls++;
                var resolver = function resolver2(err, data) {
                    _this3.readingCalls--;
                    if (_this3.waitingReads.length > 0) {
                        var next = _this3.waitingReads.shift();
                        _this3.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
                    }
                    if (err && data && tried < _this3.maxRetries) {
                        setTimeout(function() {
                            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
                        }, wait);
                        return;
                    }
                    callback(err, data);
                };
                var fc = this.backend[fcName].bind(this.backend);
                if (fc.length === 2) {
                    try {
                        var r = fc(lng, ns);
                        if (r && typeof r.then === "function") {
                            r.then(function(data) {
                                return resolver(null, data);
                            })["catch"](resolver);
                        } else {
                            resolver(null, r);
                        }
                    } catch (err) {
                        resolver(err);
                    }
                    return;
                }
                return fc(lng, ns, resolver);
            }
        },
        {
            key: "prepareLoading",
            value: function prepareLoading(languages, namespaces) {
                var _this4 = this;
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var callback = arguments.length > 3 ? arguments[3] : void 0;
                if (!this.backend) {
                    this.logger.warn("No backend was added via i18next.use. Will not load resources.");
                    return callback && callback();
                }
                if (typeof languages === "string") languages = this.languageUtils.toResolveHierarchy(languages);
                if (typeof namespaces === "string") namespaces = [
                    namespaces
                ];
                var toLoad = this.queueLoad(languages, namespaces, options, callback);
                if (!toLoad.toLoad.length) {
                    if (!toLoad.pending.length) callback();
                    return null;
                }
                toLoad.toLoad.forEach(function(name) {
                    _this4.loadOne(name);
                });
            }
        },
        {
            key: "load",
            value: function load(languages, namespaces, callback) {
                this.prepareLoading(languages, namespaces, {}, callback);
            }
        },
        {
            key: "reload",
            value: function reload(languages, namespaces, callback) {
                this.prepareLoading(languages, namespaces, {
                    reload: true
                }, callback);
            }
        },
        {
            key: "loadOne",
            value: function loadOne(name) {
                var _this5 = this;
                var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
                var s = name.split("|");
                var lng = s[0];
                var ns = s[1];
                this.read(lng, ns, "read", void 0, void 0, function(err, data) {
                    if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
                    if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
                    _this5.loaded(name, err, data);
                });
            }
        },
        {
            key: "saveMissing",
            value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
                var options = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
                var clb = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : function clb() {};
                if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
                    this.logger.warn('did not save key "'.concat(key, '" as the namespace "').concat(namespace, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
                    return;
                }
                if (key === void 0 || key === null || key === "") return;
                if (this.backend && this.backend.create) {
                    var opts = _objectSpread$1(_objectSpread$1({}, options), {}, {
                        isUpdate: isUpdate
                    });
                    var fc = this.backend.create.bind(this.backend);
                    if (fc.length < 6) {
                        try {
                            var r;
                            if (fc.length === 5) {
                                r = fc(languages, namespace, key, fallbackValue, opts);
                            } else {
                                r = fc(languages, namespace, key, fallbackValue);
                            }
                            if (r && typeof r.then === "function") {
                                r.then(function(data) {
                                    return clb(null, data);
                                })["catch"](clb);
                            } else {
                                clb(null, r);
                            }
                        } catch (err) {
                            clb(err);
                        }
                    } else {
                        fc(languages, namespace, key, fallbackValue, clb, opts);
                    }
                }
                if (!languages || !languages[0]) return;
                this.store.addResource(languages[0], namespace, key, fallbackValue);
            }
        }
    ]);
    return Connector2;
}(EventEmitter);
function get() {
    return {
        debug: false,
        initImmediate: true,
        ns: [
            "translation"
        ],
        defaultNS: [
            "translation"
        ],
        fallbackLng: [
            "dev"
        ],
        fallbackNS: false,
        supportedLngs: false,
        nonExplicitSupportedLngs: false,
        load: "all",
        preload: false,
        simplifyPluralSuffix: true,
        keySeparator: ".",
        nsSeparator: ":",
        pluralSeparator: "_",
        contextSeparator: "_",
        partialBundledLanguages: false,
        saveMissing: false,
        updateMissing: false,
        saveMissingTo: "fallback",
        saveMissingPlurals: true,
        missingKeyHandler: false,
        missingInterpolationHandler: false,
        postProcess: false,
        postProcessPassResolved: false,
        returnNull: true,
        returnEmptyString: true,
        returnObjects: false,
        joinArrays: false,
        returnedObjectHandler: false,
        parseMissingKeyHandler: false,
        appendNamespaceToMissingKey: false,
        appendNamespaceToCIMode: false,
        overloadTranslationOptionHandler: function handle2(args) {
            var ret = {};
            if (_typeof(args[1]) === "object") ret = args[1];
            if (typeof args[1] === "string") ret.defaultValue = args[1];
            if (typeof args[2] === "string") ret.tDescription = args[2];
            if (_typeof(args[2]) === "object" || _typeof(args[3]) === "object") {
                var options = args[3] || args[2];
                Object.keys(options).forEach(function(key) {
                    ret[key] = options[key];
                });
            }
            return ret;
        },
        interpolation: {
            escapeValue: true,
            format: function format(value, _format, lng, options) {
                return value;
            },
            prefix: "{{",
            suffix: "}}",
            formatSeparator: ",",
            unescapePrefix: "-",
            nestingPrefix: "$t(",
            nestingSuffix: ")",
            nestingOptionsSeparator: ",",
            maxReplaces: 1e3,
            skipOnVariables: true
        }
    };
}
function transformOptions(options) {
    if (typeof options.ns === "string") options.ns = [
        options.ns
    ];
    if (typeof options.fallbackLng === "string") options.fallbackLng = [
        options.fallbackLng
    ];
    if (typeof options.fallbackNS === "string") options.fallbackNS = [
        options.fallbackNS
    ];
    if (options.supportedLngs && options.supportedLngs.indexOf("cimode") < 0) {
        options.supportedLngs = options.supportedLngs.concat([
            "cimode"
        ]);
    }
    return options;
}
function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function noop() {}
function bindMemberFunctions(inst) {
    var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
    mems.forEach(function(mem) {
        if (typeof inst[mem] === "function") {
            inst[mem] = inst[mem].bind(inst);
        }
    });
}
var I18n = function(_EventEmitter) {
    _inherits(I18n2, _EventEmitter);
    var _super = _createSuper(I18n2);
    function I18n2() {
        var _this;
        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments.length > 1 ? arguments[1] : void 0;
        _classCallCheck(this, I18n2);
        _this = _super.call(this);
        if (isIE10) {
            EventEmitter.call(_assertThisInitialized(_this));
        }
        _this.options = transformOptions(options);
        _this.services = {};
        _this.logger = baseLogger;
        _this.modules = {
            external: []
        };
        bindMemberFunctions(_assertThisInitialized(_this));
        if (callback && !_this.isInitialized && !options.isClone) {
            if (!_this.options.initImmediate) {
                _this.init(options, callback);
                return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
            }
            setTimeout(function() {
                _this.init(options, callback);
            }, 0);
        }
        return _this;
    }
    _createClass(I18n2, [
        {
            key: "init",
            value: function init2() {
                var createClassOnDemand = function createClassOnDemand(ClassOrObject) {
                    if (!ClassOrObject) return null;
                    if (typeof ClassOrObject === "function") return new ClassOrObject();
                    return ClassOrObject;
                };
                var _this2 = this;
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var callback = arguments.length > 1 ? arguments[1] : void 0;
                if (typeof options === "function") {
                    callback = options;
                    options = {};
                }
                if (!options.defaultNS && options.defaultNS !== false && options.ns) {
                    if (typeof options.ns === "string") {
                        options.defaultNS = options.ns;
                    } else if (options.ns.indexOf("translation") < 0) {
                        options.defaultNS = options.ns[0];
                    }
                }
                var defOpts = get();
                this.options = _objectSpread(_objectSpread(_objectSpread({}, defOpts), this.options), transformOptions(options));
                if (this.options.compatibilityAPI !== "v1") {
                    this.options.interpolation = _objectSpread(_objectSpread({}, defOpts.interpolation), this.options.interpolation);
                }
                if (options.keySeparator !== void 0) {
                    this.options.userDefinedKeySeparator = options.keySeparator;
                }
                if (options.nsSeparator !== void 0) {
                    this.options.userDefinedNsSeparator = options.nsSeparator;
                }
                if (!this.options.isClone) {
                    if (this.modules.logger) {
                        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
                    } else {
                        baseLogger.init(null, this.options);
                    }
                    var formatter;
                    if (this.modules.formatter) {
                        formatter = this.modules.formatter;
                    } else if (typeof Intl !== "undefined") {
                        formatter = Formatter;
                    }
                    var lu = new LanguageUtil(this.options);
                    this.store = new ResourceStore(this.options.resources, this.options);
                    var s = this.services;
                    s.logger = baseLogger;
                    s.resourceStore = this.store;
                    s.languageUtils = lu;
                    s.pluralResolver = new PluralResolver(lu, {
                        prepend: this.options.pluralSeparator,
                        compatibilityJSON: this.options.compatibilityJSON,
                        simplifyPluralSuffix: this.options.simplifyPluralSuffix
                    });
                    if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
                        s.formatter = createClassOnDemand(formatter);
                        s.formatter.init(s, this.options);
                        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
                    }
                    s.interpolator = new Interpolator(this.options);
                    s.utils = {
                        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                    };
                    s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
                    s.backendConnector.on("*", function(event) {
                        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                            args[_key - 1] = arguments[_key];
                        }
                        _this2.emit.apply(_this2, [
                            event
                        ].concat(args));
                    });
                    if (this.modules.languageDetector) {
                        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
                        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
                    }
                    if (this.modules.i18nFormat) {
                        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
                        if (s.i18nFormat.init) s.i18nFormat.init(this);
                    }
                    this.translator = new Translator(this.services, this.options);
                    this.translator.on("*", function(event) {
                        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
                            args[_key2 - 1] = arguments[_key2];
                        }
                        _this2.emit.apply(_this2, [
                            event
                        ].concat(args));
                    });
                    this.modules.external.forEach(function(m) {
                        if (m.init) m.init(_this2);
                    });
                }
                this.format = this.options.interpolation.format;
                if (!callback) callback = noop;
                if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                    var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                    if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
                }
                if (!this.services.languageDetector && !this.options.lng) {
                    this.logger.warn("init: no languageDetector is used and no lng is defined");
                }
                var storeApi = [
                    "getResource",
                    "hasResourceBundle",
                    "getResourceBundle",
                    "getDataByLanguage"
                ];
                storeApi.forEach(function(fcName) {
                    _this2[fcName] = function() {
                        var _this2$store;
                        return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
                    };
                });
                var storeApiChained = [
                    "addResource",
                    "addResources",
                    "addResourceBundle",
                    "removeResourceBundle"
                ];
                storeApiChained.forEach(function(fcName) {
                    _this2[fcName] = function() {
                        var _this2$store2;
                        (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);
                        return _this2;
                    };
                });
                var deferred = defer();
                var load = function load2() {
                    var finish = function finish2(err, t2) {
                        if (_this2.isInitialized && !_this2.initializedStoreOnce) _this2.logger.warn("init: i18next is already initialized. You should call init just once!");
                        _this2.isInitialized = true;
                        if (!_this2.options.isClone) _this2.logger.log("initialized", _this2.options);
                        _this2.emit("initialized", _this2.options);
                        deferred.resolve(t2);
                        callback(err, t2);
                    };
                    if (_this2.languages && _this2.options.compatibilityAPI !== "v1" && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));
                    _this2.changeLanguage(_this2.options.lng, finish);
                };
                if (this.options.resources || !this.options.initImmediate) {
                    load();
                } else {
                    setTimeout(load, 0);
                }
                return deferred;
            }
        },
        {
            key: "loadResources",
            value: function loadResources2(language) {
                var _this3 = this;
                var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
                var usedCallback = callback;
                var usedLng = typeof language === "string" ? language : this.language;
                if (typeof language === "function") usedCallback = language;
                if (!this.options.resources || this.options.partialBundledLanguages) {
                    if (usedLng && usedLng.toLowerCase() === "cimode") return usedCallback();
                    var toLoad = [];
                    var append = function append2(lng) {
                        if (!lng) return;
                        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
                        lngs.forEach(function(l) {
                            if (toLoad.indexOf(l) < 0) toLoad.push(l);
                        });
                    };
                    if (!usedLng) {
                        var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                        fallbacks.forEach(function(l) {
                            return append(l);
                        });
                    } else {
                        append(usedLng);
                    }
                    if (this.options.preload) {
                        this.options.preload.forEach(function(l) {
                            return append(l);
                        });
                    }
                    this.services.backendConnector.load(toLoad, this.options.ns, function(e) {
                        if (!e && !_this3.resolvedLanguage && _this3.language) _this3.setResolvedLanguage(_this3.language);
                        usedCallback(e);
                    });
                } else {
                    usedCallback(null);
                }
            }
        },
        {
            key: "reloadResources",
            value: function reloadResources2(lngs, ns, callback) {
                var deferred = defer();
                if (!lngs) lngs = this.languages;
                if (!ns) ns = this.options.ns;
                if (!callback) callback = noop;
                this.services.backendConnector.reload(lngs, ns, function(err) {
                    deferred.resolve();
                    callback(err);
                });
                return deferred;
            }
        },
        {
            key: "use",
            value: function use2(module2) {
                if (!module2) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                if (!module2.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                if (module2.type === "backend") {
                    this.modules.backend = module2;
                }
                if (module2.type === "logger" || module2.log && module2.warn && module2.error) {
                    this.modules.logger = module2;
                }
                if (module2.type === "languageDetector") {
                    this.modules.languageDetector = module2;
                }
                if (module2.type === "i18nFormat") {
                    this.modules.i18nFormat = module2;
                }
                if (module2.type === "postProcessor") {
                    postProcessor.addPostProcessor(module2);
                }
                if (module2.type === "formatter") {
                    this.modules.formatter = module2;
                }
                if (module2.type === "3rdParty") {
                    this.modules.external.push(module2);
                }
                return this;
            }
        },
        {
            key: "setResolvedLanguage",
            value: function setResolvedLanguage(l) {
                if (!l || !this.languages) return;
                if ([
                    "cimode",
                    "dev"
                ].indexOf(l) > -1) return;
                for(var li = 0; li < this.languages.length; li++){
                    var lngInLngs = this.languages[li];
                    if ([
                        "cimode",
                        "dev"
                    ].indexOf(lngInLngs) > -1) continue;
                    if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
                        this.resolvedLanguage = lngInLngs;
                        break;
                    }
                }
            }
        },
        {
            key: "changeLanguage",
            value: function changeLanguage2(lng, callback) {
                var _this4 = this;
                this.isLanguageChangingTo = lng;
                var deferred = defer();
                this.emit("languageChanging", lng);
                var setLngProps = function setLngProps2(l) {
                    _this4.language = l;
                    _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
                    _this4.resolvedLanguage = void 0;
                    _this4.setResolvedLanguage(l);
                };
                var done = function done2(err, l) {
                    if (l) {
                        setLngProps(l);
                        _this4.translator.changeLanguage(l);
                        _this4.isLanguageChangingTo = void 0;
                        _this4.emit("languageChanged", l);
                        _this4.logger.log("languageChanged", l);
                    } else {
                        _this4.isLanguageChangingTo = void 0;
                    }
                    deferred.resolve(function() {
                        return _this4.t.apply(_this4, arguments);
                    });
                    if (callback) callback(err, function() {
                        return _this4.t.apply(_this4, arguments);
                    });
                };
                var setLng = function setLng2(lngs) {
                    if (!lng && !lngs && _this4.services.languageDetector) lngs = [];
                    var l = typeof lngs === "string" ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);
                    if (l) {
                        if (!_this4.language) {
                            setLngProps(l);
                        }
                        if (!_this4.translator.language) _this4.translator.changeLanguage(l);
                        if (_this4.services.languageDetector && _this4.services.languageDetector.cacheUserLanguage) _this4.services.languageDetector.cacheUserLanguage(l);
                    }
                    _this4.loadResources(l, function(err) {
                        done(err, l);
                    });
                };
                if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
                    setLng(this.services.languageDetector.detect());
                } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
                    if (this.services.languageDetector.detect.length === 0) {
                        this.services.languageDetector.detect().then(setLng);
                    } else {
                        this.services.languageDetector.detect(setLng);
                    }
                } else {
                    setLng(lng);
                }
                return deferred;
            }
        },
        {
            key: "getFixedT",
            value: function getFixedT2(lng, ns, keyPrefix) {
                var _this5 = this;
                var fixedT = function fixedT2(key, opts) {
                    var options;
                    if (_typeof(opts) !== "object") {
                        for(var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++){
                            rest[_key3 - 2] = arguments[_key3];
                        }
                        options = _this5.options.overloadTranslationOptionHandler([
                            key,
                            opts
                        ].concat(rest));
                    } else {
                        options = _objectSpread({}, opts);
                    }
                    options.lng = options.lng || fixedT2.lng;
                    options.lngs = options.lngs || fixedT2.lngs;
                    options.ns = options.ns || fixedT2.ns;
                    options.keyPrefix = options.keyPrefix || keyPrefix || fixedT2.keyPrefix;
                    var keySeparator = _this5.options.keySeparator || ".";
                    var resultKey;
                    if (options.keyPrefix && Array.isArray(key)) {
                        resultKey = key.map(function(k) {
                            return "".concat(options.keyPrefix).concat(keySeparator).concat(k);
                        });
                    } else {
                        resultKey = options.keyPrefix ? "".concat(options.keyPrefix).concat(keySeparator).concat(key) : key;
                    }
                    return _this5.t(resultKey, options);
                };
                if (typeof lng === "string") {
                    fixedT.lng = lng;
                } else {
                    fixedT.lngs = lng;
                }
                fixedT.ns = ns;
                fixedT.keyPrefix = keyPrefix;
                return fixedT;
            }
        },
        {
            key: "t",
            value: function t2() {
                var _this$translator;
                return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
            }
        },
        {
            key: "exists",
            value: function exists2() {
                var _this$translator2;
                return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
            }
        },
        {
            key: "setDefaultNamespace",
            value: function setDefaultNamespace2(ns) {
                this.options.defaultNS = ns;
            }
        },
        {
            key: "hasLoadedNamespace",
            value: function hasLoadedNamespace2(ns) {
                var _this6 = this;
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                if (!this.isInitialized) {
                    this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
                    return false;
                }
                if (!this.languages || !this.languages.length) {
                    this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
                    return false;
                }
                var lng = this.resolvedLanguage || this.languages[0];
                var fallbackLng = this.options ? this.options.fallbackLng : false;
                var lastLng = this.languages[this.languages.length - 1];
                if (lng.toLowerCase() === "cimode") return true;
                var loadNotPending = function loadNotPending2(l, n) {
                    var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];
                    return loadState === -1 || loadState === 2;
                };
                if (options.precheck) {
                    var preResult = options.precheck(this, loadNotPending);
                    if (preResult !== void 0) return preResult;
                }
                if (this.hasResourceBundle(lng, ns)) return true;
                if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
                if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
                return false;
            }
        },
        {
            key: "loadNamespaces",
            value: function loadNamespaces2(ns, callback) {
                var _this7 = this;
                var deferred = defer();
                if (!this.options.ns) {
                    if (callback) callback();
                    return Promise.resolve();
                }
                if (typeof ns === "string") ns = [
                    ns
                ];
                ns.forEach(function(n) {
                    if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
                });
                this.loadResources(function(err) {
                    deferred.resolve();
                    if (callback) callback(err);
                });
                return deferred;
            }
        },
        {
            key: "loadLanguages",
            value: function loadLanguages2(lngs, callback) {
                var deferred = defer();
                if (typeof lngs === "string") lngs = [
                    lngs
                ];
                var preloaded = this.options.preload || [];
                var newLngs = lngs.filter(function(lng) {
                    return preloaded.indexOf(lng) < 0;
                });
                if (!newLngs.length) {
                    if (callback) callback();
                    return Promise.resolve();
                }
                this.options.preload = preloaded.concat(newLngs);
                this.loadResources(function(err) {
                    deferred.resolve();
                    if (callback) callback(err);
                });
                return deferred;
            }
        },
        {
            key: "dir",
            value: function dir2(lng) {
                if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
                if (!lng) return "rtl";
                var rtlLngs = [
                    "ar",
                    "shu",
                    "sqr",
                    "ssh",
                    "xaa",
                    "yhd",
                    "yud",
                    "aao",
                    "abh",
                    "abv",
                    "acm",
                    "acq",
                    "acw",
                    "acx",
                    "acy",
                    "adf",
                    "ads",
                    "aeb",
                    "aec",
                    "afb",
                    "ajp",
                    "apc",
                    "apd",
                    "arb",
                    "arq",
                    "ars",
                    "ary",
                    "arz",
                    "auz",
                    "avl",
                    "ayh",
                    "ayl",
                    "ayn",
                    "ayp",
                    "bbz",
                    "pga",
                    "he",
                    "iw",
                    "ps",
                    "pbt",
                    "pbu",
                    "pst",
                    "prp",
                    "prd",
                    "ug",
                    "ur",
                    "ydd",
                    "yds",
                    "yih",
                    "ji",
                    "yi",
                    "hbo",
                    "men",
                    "xmn",
                    "fa",
                    "jpr",
                    "peo",
                    "pes",
                    "prs",
                    "dv",
                    "sam",
                    "ckb"
                ];
                var languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get());
                return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
            }
        },
        {
            key: "cloneInstance",
            value: function cloneInstance() {
                var _this8 = this;
                var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
                var mergedOptions = _objectSpread(_objectSpread(_objectSpread({}, this.options), options), {
                    isClone: true
                });
                var clone = new I18n2(mergedOptions);
                if (options.debug !== void 0 || options.prefix !== void 0) {
                    clone.logger = clone.logger.clone(options);
                }
                var membersToCopy = [
                    "store",
                    "services",
                    "language"
                ];
                membersToCopy.forEach(function(m) {
                    clone[m] = _this8[m];
                });
                clone.services = _objectSpread({}, this.services);
                clone.services.utils = {
                    hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
                };
                clone.translator = new Translator(clone.services, clone.options);
                clone.translator.on("*", function(event) {
                    for(var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++){
                        args[_key4 - 1] = arguments[_key4];
                    }
                    clone.emit.apply(clone, [
                        event
                    ].concat(args));
                });
                clone.init(mergedOptions, callback);
                clone.translator.options = clone.options;
                clone.translator.backendConnector.services.utils = {
                    hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
                };
                return clone;
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    options: this.options,
                    store: this.store,
                    language: this.language,
                    languages: this.languages,
                    resolvedLanguage: this.resolvedLanguage
                };
            }
        }
    ]);
    return I18n2;
}(EventEmitter);
_defineProperty(I18n, "createInstance", function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : void 0;
    return new I18n(options, callback);
});
var instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;
var createInstance = instance.createInstance;
var dir = instance.dir;
var init = instance.init;
var loadResources = instance.loadResources;
var reloadResources = instance.reloadResources;
var use = instance.use;
var changeLanguage = instance.changeLanguage;
var getFixedT = instance.getFixedT;
var t = instance.t;
var exists = instance.exists;
var setDefaultNamespace = instance.setDefaultNamespace;
var hasLoadedNamespace = instance.hasLoadedNamespace;
var loadNamespaces = instance.loadNamespaces;
var loadLanguages = instance.loadLanguages;
// src/app/i18n.ts
var import_react_i18next5 = require("react-i18next");
var import_i18next_browser_languagedetector = __toESM(require("i18next-browser-languagedetector"));
instance.use(import_i18next_browser_languagedetector.default).use(import_react_i18next5.initReactI18next).init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                emailHelpText: "{{productName}} will be sent to your email upon successful payment.",
                thankForYourPayment: "Thanks for Your Purchase!",
                productWillBeSent: "Get ready! Your {{productName}} is zooming its way to your inbox.",
                poweredBy: "Powered by",
                libraLogo: "Libra Logo",
                privacy: "Privacy",
                terms: "Terms",
                defaultErrorMessage: "Oops! Something went wrong. Please contact help@golibra.xyz to get the supports.",
                insufficientBalanceError: "Oops! It seems your balance is not sufficient to process the payment.",
                contactInformation: "Contact information",
                paymentMethod: "Payment method",
                pay: "Pay",
                funnyQuotes: {
                    0: "We’re busy finding Satoshi, back in a flash",
                    1: "Mining your patience, rewards coming soon",
                    2: "Decentralizing your wait time, one block at a time",
                    3: "Hold on tight, we’re mining some more data",
                    4: "The network is slow, but our memes are fast",
                    5: "Calm your gas fees, we’re revving up the blockchain",
                    6: "Sit tight, our nodes are synchronizing the fun!",
                    7: "Assembling your crypto crew, just a moment",
                    8: "Hashing out the details, please stand by",
                    9: "Buffering blockchain magic, almost there",
                    10: "Smart contracts in progress, stay tuned",
                    11: "Patience pays, loading your crypto experience",
                    12: "Riding the blockchain wave, be right back",
                    13: "Staking your claim, just a few more moments",
                    14: "Tokenizing your patience, web3 magic in progress",
                    15: "Just a sec, we’re optimizing your crypto journey",
                    16: "Unlocking the secrets of web3, standby",
                    17: "Fasten your seatbelts, we’re diving into the metaverse"
                }
            }
        }
    }
});
// src/components/Checkout/index.tsx
var import_react7 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Content = import_antd7.Layout.Content;
var Wrapper = (0, import_styled_components3.default)(import_antd7.Layout)(_templateObject6());
var ContentWrapper = (0, import_styled_components3.default)(Content)(_templateObject7());
var MainContent = (0, import_styled_components3.default)(import_antd7.Row)(_templateObject8());
var CheckoutPreview = function(param) {
    var checkoutData = param.checkoutData, _param_previewMode = param.previewMode, previewMode = _param_previewMode === void 0 ? true : _param_previewMode, _param_isShowAfterPayment = param.isShowAfterPayment, isShowAfterPayment = _param_isShowAfterPayment === void 0 ? false : _param_isShowAfterPayment, _param_loading = param.loading, loading = _param_loading === void 0 ? false : _param_loading, HandlePaymentComponent = param.HandlePaymentComponent;
    var branding = checkoutData.branding, item = checkoutData.item, assetId = checkoutData.assetId, networkId = checkoutData.networkId, afterPayment = checkoutData.afterPayment;
    var _ref = _sliced_to_array((0, import_react7.useState)(false), 2), completed = _ref[0], setCompleted = _ref[1];
    var handlePaymentSuccess = function() {
        if (afterPayment && afterPayment.type === "redirect" && afterPayment.config.url) {
            window.location.href = afterPayment.config.url;
            return;
        }
        setCompleted(true);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Wrapper, {
        children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Brand_default, {
                branding: branding,
                loading: loading
            }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ContentWrapper, {
                children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(MainContent, {
                    justify: "space-between",
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_antd7.Col, {
                            span: 12,
                            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CheckoutSummary_default, {
                                loading: loading,
                                product: item,
                                asset: {
                                    assetId: assetId,
                                    networkId: networkId
                                },
                                previewMode: previewMode
                            })
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_antd7.Col, {
                            span: 12,
                            children: (completed || isShowAfterPayment) && afterPayment ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(AfterPaymentPreviewer_default, {
                                afterPayment: afterPayment,
                                productName: item.name || "The product"
                            }) : previewMode ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(PaymentSummary, {
                                payment: {
                                    payee: checkoutData.payee || "",
                                    amount: checkoutData.item.price || 0,
                                    asset: {
                                        assetId: assetId,
                                        networkId: networkId
                                    },
                                    productName: checkoutData.item.name
                                }
                            }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(HandlePaymentComponent, {
                                onPaymentSuccess: handlePaymentSuccess,
                                payment: {
                                    payee: checkoutData.payee || "",
                                    amount: checkoutData.item.price || 0,
                                    asset: {
                                        assetId: assetId,
                                        networkId: networkId
                                    },
                                    productName: checkoutData.item.name
                                }
                            })
                        })
                    ]
                })
            })
        ]
    });
};
var Checkout_default = CheckoutPreview;
// src/utils/extension.ts
function hasInjectedWeb3() {
    var ethereum = window.ethereum, injectedWeb3 = window.injectedWeb3;
    return ethereum || injectedWeb3;
}
var hasInjectedWallet = function() {
    var injectedWeb3 = window.injectedWeb3;
    return injectedWeb3;
};
var getExtensions = function() {
    var injectedWeb3 = window.injectedWeb3;
    var extensions = [];
    EXTENSIONS.forEach(function(extension) {
        var extensionInstant = injectedWeb3 === null || injectedWeb3 === void 0 ? void 0 : injectedWeb3[extension.id];
        if (extensionInstant) {
            extensions.push({
                id: extension.id,
                instant: extensionInstant
            });
        }
    });
    return extensions;
};
var getExtension = function(id) {
    var extensions = getExtensions();
    return extensions.find(function(extension) {
        return extension.id === id;
    });
};
var extensionAPI = {
    getExtensions: function getExtensions1() {
        var retryCounter = 0;
        return new Promise(function(resolve, reject) {
            var retryInterval = setInterval(function() {
                if (hasInjectedWeb3()) {
                    clearInterval(retryInterval);
                    var extensions = getExtensions();
                    resolve(extensions);
                }
                if (++retryCounter === GET_EXTENSIONS_MAX_RETRY) {
                    clearInterval(retryInterval);
                    reject(new Error());
                }
            }, GET_EXTENSIONS_INTERVAL_DURATION);
        });
    },
    getExtension: function getExtension1(id) {
        var retryCounter = 0;
        return new Promise(function(resolve, reject) {
            var retryInterval = setInterval(function() {
                if (hasInjectedWallet()) {
                    clearInterval(retryInterval);
                    var extension = getExtension(id);
                    resolve(extension);
                }
                if (++retryCounter === GET_EXTENSIONS_MAX_RETRY) {
                    clearInterval(retryInterval);
                    reject(new Error());
                }
            }, GET_EXTENSIONS_INTERVAL_DURATION);
        });
    }
};
var extension_default = extensionAPI;
// src/components/Common/Loading.tsx
var import_react8 = require("react");
var import_styled_components4 = __toESM(require("styled-components"));
var import_antd8 = require("antd");
var import_react_i18next6 = require("react-i18next");
var import_jsx_runtime9 = require("react/jsx-runtime");
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var FullPageWrapper = import_styled_components4.default.div(_templateObject9());
var LoadingWrapper = import_styled_components4.default.div(_templateObject10());
var PageContentLoadingWrapper = (0, import_styled_components4.default)(FullPageWrapper)(_templateObject11());
var LoaderContainer = import_styled_components4.default.div(_templateObject12());
var useFunnyQuote = function(loading) {
    var prevQuoteRef = (0, import_react8.useRef)();
    var _ref = (0, import_react_i18next6.useTranslation)(), t2 = _ref.t;
    var quote = (0, import_react8.useMemo)(function() {
        var getFunnyQuote = function() {
            var quoteIndex = getRandomInt(0, 17);
            return t2("funnyQuotes.".concat(quoteIndex));
        };
        if (!loading) {
            return prevQuoteRef.current;
        }
        prevQuoteRef.current = getFunnyQuote();
        return prevQuoteRef.current;
    }, [
        loading,
        t2
    ]);
    return quote;
};
var NORMAL_ICON_SIZE = 20;
var FULL_PAGE_ICON_SIZE = 25;
var NORMAL_TEXT_FONT_SIZE = 15;
var FULL_PAGE_TEXT_FONT_SIZE = 17;
var Loading = function(param) {
    var _param_loading = param.loading, loading = _param_loading === void 0 ? true : _param_loading, isFullPage = param.isFullPage, isContentPage = param.isContentPage, message = param.message, bordered = param.bordered;
    var _import_antd8_theme_useToken = import_antd8.theme.useToken(), _import_antd8_theme_useToken_token = _import_antd8_theme_useToken.token, colorBgBase = _import_antd8_theme_useToken_token.colorBgBase, colorTextTertiary = _import_antd8_theme_useToken_token.colorTextTertiary;
    var quote = useFunnyQuote(loading);
    var style = {
        background: colorBgBase,
        borderRadius: bordered ? 8 : 0
    };
    var loadingContent = /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LoaderContainer, {
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_antd8.Space, {
            align: "center",
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_antd8.Spin, {
                    indicator: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Loading3QuartersOutlined_default2, {
                        style: {
                            fontSize: isFullPage || isContentPage ? FULL_PAGE_ICON_SIZE : NORMAL_ICON_SIZE,
                            color: colorTextTertiary
                        },
                        spin: true
                    })
                }),
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_antd8.Typography.Paragraph, {
                    style: {
                        margin: 0,
                        marginLeft: 7,
                        fontSize: isFullPage || isContentPage ? FULL_PAGE_TEXT_FONT_SIZE : NORMAL_TEXT_FONT_SIZE
                    },
                    type: "secondary",
                    children: message !== null && message !== void 0 ? message : quote
                })
            ]
        })
    });
    if (!loading) {
        return null;
    }
    if (isContentPage) {
        return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(PageContentLoadingWrapper, {
            style: style,
            children: loadingContent
        });
    }
    return isFullPage ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FullPageWrapper, {
        style: style,
        children: loadingContent
    }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LoadingWrapper, {
        style: style,
        children: loadingContent
    });
};
var Loading_default = (0, import_react8.memo)(Loading, function(oldProps, newProps) {
    return oldProps.loading === newProps.loading;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    AccountOption: AccountOption,
    CheckoutComponent: CheckoutComponent,
    ContactInformation: ContactInformation,
    EXTENSIONS: EXTENSIONS,
    EXTENSION_IDS: EXTENSION_IDS,
    Loading: Loading,
    extensionAPI: extensionAPI,
    getAssetMetadata: getAssetMetadata,
    getExtensionId: getExtensionId,
    getNetwork: getNetwork,
    getNetworkAssets: getNetworkAssets,
    getWalletNetworks: getWalletNetworks,
    priceFormatHelper: priceFormatHelper
}); /*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/ 
