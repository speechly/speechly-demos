"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceToggle = void 0;
var react_1 = __importStar(require("react"));
var react_client_1 = require("@speechly/react-client");
var utils_1 = require("../utils");
var VoiceToggle = function (_a) {
    var intent = _a.intent, options = _a.options, entityName = _a.entityName, initValue = _a.initValue, onChange = _a.onChange, onFinal = _a.onFinal, onBlur = _a.onBlur, onFocus = _a.onFocus, _b = _a.focused, focused = _b === void 0 ? true : _b, _c = _a.handledAudioContext, handledAudioContext = _c === void 0 ? '' : _c;
    var inputEl = react_1.useRef(null);
    var optionsInUpperCase = options.map(function (option) { return option.toUpperCase(); });
    var _d = react_1.useState(focused), _focused = _d[0], _setFocused = _d[1];
    var _e = react_1.useState(initValue !== null && initValue !== void 0 ? initValue : ''), value = _e[0], setValue = _e[1];
    var segment = react_client_1.useSpeechContext().segment;
    react_1.useEffect(function () {
        if (onChange) {
            onChange(value);
        }
    }, [value]);
    var _onFocus = function () {
        _setFocused(true);
        // use callback only to change parent state
        if (!focused && onFocus) {
            onFocus();
        }
    };
    var _onBlur = function () {
        // use callback only to change parent state
        if (_focused) {
            _setFocused(false);
            if (onBlur) {
                onBlur();
            }
        }
    };
    react_1.useEffect(function () {
        if (focused && !_focused && inputEl != null && inputEl.current != null) {
            inputEl.current.focus();
        }
    }, [focused]);
    react_1.useEffect(function () {
        if (segment && segment.contextId !== handledAudioContext) {
            switch (segment === null || segment === void 0 ? void 0 : segment.intent.intent) {
                case intent:
                    if (entityName !== undefined) {
                        var entities = utils_1.formatEntities(segment.entities);
                        if (entities[entityName] !== undefined) {
                            var index = optionsInUpperCase.findIndex(function (option) { return option === entityName.toUpperCase(); });
                            if (index) {
                                setValue(options[index]);
                            }
                        }
                    }
                    break;
                default:
            }
            if (segment === null || segment === void 0 ? void 0 : segment.isFinal) {
                if (inputEl != null && inputEl.current != null) {
                    inputEl.current.blur();
                }
                if (onFinal) {
                    onFinal();
                }
            }
        }
    }, [segment]);
    var selectOption = function (value) {
        setValue(value);
    };
    return (react_1.default.createElement("div", { ref: inputEl, className: "widgetGroup toggle" }, options.map(function (optionValue) {
        return react_1.default.createElement("button", { type: "button", className: value === optionValue ? 'active' : '', key: optionValue, onClick: function () { return selectOption(optionValue); } }, optionValue);
    })));
};
exports.VoiceToggle = VoiceToggle;
//# sourceMappingURL=VoiceToggle.js.map