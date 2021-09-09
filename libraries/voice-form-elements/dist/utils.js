"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatEntities = void 0;
/**
 * Format entities to a key value object
 * @param {array} entities
 * @return {object} key value object.
 */
var formatEntities = function (entities) {
    return entities.reduce(function (accumulator, currentValue) {
        var _a;
        return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue.type] = currentValue.value, _a)));
    }, {});
};
exports.formatEntities = formatEntities;
//# sourceMappingURL=utils.js.map