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
exports.VoiceDatePicker = void 0;
var react_1 = __importStar(require("react"));
var react_client_1 = require("@speechly/react-client");
var Calendar_1 = require("./Calendar");
var CalendarIcon_1 = require("./CalendarIcon");
var utils_1 = require("../utils");
var VoiceDatePicker = function (_a) {
    var label = _a.label, intent = _a.intent, entityName = _a.entityName, initDate = _a.initDate, onChange = _a.onChange, onFinal = _a.onFinal, onBlur = _a.onBlur, onFocus = _a.onFocus, _b = _a.focused, focused = _b === void 0 ? true : _b, _c = _a.handledAudioContext, handledAudioContext = _c === void 0 ? '' : _c;
    var inputEl = react_1.useRef(null);
    var _d = react_1.useState(false), _showCalendar = _d[0], _setShowCalendar = _d[1];
    var _e = react_1.useState(focused), _focused = _e[0], _setFocused = _e[1];
    var _f = react_1.useState(initDate ? new Date(Date.parse(initDate)) : undefined), date = _f[0], setDate = _f[1];
    var _g = react_1.useState(''), value = _g[0], setValue = _g[1];
    var segment = react_client_1.useSpeechContext().segment;
    react_1.useEffect(function () {
        if (date) {
            setValue((date.getDate()).toString().padStart(2, '0') + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getFullYear());
            if (onChange) {
                onChange(date);
            }
        }
    }, [date]);
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
                            setDate(new Date(Date.parse(entities[entityName])));
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
    var onInputChange = function (event) {
        var newValue = event.target.value;
        setValue(newValue);
        if (newValue && newValue.length === 10) {
            try {
                var newDate = Date.parse(newValue);
                console.log(newDate);
                if (!isNaN(newDate)) {
                    setDate(new Date(newDate));
                }
            }
            catch (e) { }
        }
    };
    var toggleCalendar = function (e) {
        e.preventDefault();
        _setShowCalendar(!_showCalendar);
    };
    var onDatePick = function (pickedDate) {
        _setShowCalendar(!_showCalendar);
        setDate(pickedDate);
    };
    return (react_1.default.createElement("div", { className: "widgetGroup inputText withCalendar" },
        react_1.default.createElement("label", null, label),
        react_1.default.createElement("input", { ref: inputEl, type: "text", name: entityName, value: value, onChange: onInputChange, onBlur: _onBlur, onFocus: _onFocus }),
        react_1.default.createElement("button", { className: "calendar-button", onClick: toggleCalendar },
            react_1.default.createElement("span", { className: "" },
                react_1.default.createElement(CalendarIcon_1.CalendarIcon, null))),
        _showCalendar && react_1.default.createElement(Calendar_1.Calendar, { date: date, onDatePick: onDatePick })));
};
exports.VoiceDatePicker = VoiceDatePicker;
//# sourceMappingURL=VoiceDatePicker.js.map