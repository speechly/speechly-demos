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
exports.Calendar = void 0;
var react_1 = __importStar(require("react"));
var DAY = 24 * 3600 * 1000;
var buildCalendar = function (firstDate) {
    var dates = [];
    for (var i = 0 - firstDate.getDay(); i < 29 || dates.length % 7 != 1; i++) {
        dates.push(new Date(firstDate.getTime() + i * DAY));
    }
    return dates;
};
var groupByWeek = function (acc, date) {
    var row = acc.length;
    if (row === 0) {
        // init
        acc[row] = [];
        acc[row].push(date);
        return acc;
    }
    if (acc[row - 1].length === 7) {
        row++;
    }
    if (acc[row - 1] === undefined) {
        acc[row - 1] = [];
    }
    acc[row - 1].push(date);
    return acc;
};
var Calendar = function (_a) {
    var date = _a.date, onDatePick = _a.onDatePick;
    var _b = react_1.useState(date !== null && date !== void 0 ? date : new Date()), _date = _b[0], setDate = _b[1];
    var firstDate = new Date(Date.parse((_date.getMonth() + 1).toString().padStart(2, '0') + "-01-" + _date.getFullYear()));
    var dates = buildCalendar(firstDate);
    var weekDays = [
        'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'
    ];
    var months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    var prevMonth = function (e) {
        e.preventDefault();
        var year = _date.getFullYear();
        var month = _date.getMonth();
        if (_date.getMonth() === 0) {
            year--;
            month = 11;
        }
        else {
            month--;
        }
        var prevMonth = new Date(Date.parse((month + 1).toString().padStart(2, '0') + "-01-" + year));
        setDate(prevMonth);
    };
    var nextMonth = function (e) {
        e.preventDefault();
        var year = _date.getFullYear();
        var month = _date.getMonth();
        if (_date.getMonth() === 11) {
            year++;
            month = 0;
        }
        else {
            month++;
        }
        var nextMonth = new Date(Date.parse((month + 1).toString().padStart(2, '0') + "-01-" + year));
        setDate(nextMonth);
    };
    var pick = function (pickedDate) {
        if (onDatePick) {
            onDatePick(pickedDate);
        }
    };
    return (react_1.default.createElement("div", { className: "calendar" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "span12" },
                react_1.default.createElement("table", { className: "table-condensed table-bordered table-striped" },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", { className: "header" },
                            react_1.default.createElement("th", null,
                                react_1.default.createElement("button", { className: "prev-button", onClick: prevMonth }, "<")),
                            react_1.default.createElement("th", { colSpan: 5 },
                                react_1.default.createElement("div", null, _date && months[_date.getMonth()] + ' ' + _date.getFullYear())),
                            react_1.default.createElement("th", null,
                                react_1.default.createElement("button", { className: "next-bottin", onClick: nextMonth }, ">"))),
                        react_1.default.createElement("tr", null, weekDays.map(function (d) { return react_1.default.createElement("th", { key: d }, d); }))),
                    react_1.default.createElement("tbody", null, dates && dates.reduce(groupByWeek, []).map(function (datesInWeek, i) {
                        return react_1.default.createElement("tr", { key: i }, datesInWeek.map(function (d) { return react_1.default.createElement("td", { key: d.getTime(), className: date && _date.getMonth() !== d.getMonth() ? 'muted' :
                                (date && _date.getDate() === d.getDate() ? 'selected' : ''), onClick: function () { return pick(d); } }, d.getDate()); }));
                    })))))));
};
exports.Calendar = Calendar;
//# sourceMappingURL=Calendar.js.map