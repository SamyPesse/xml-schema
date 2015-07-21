var _ = require('lodash');

function isBasicValue(val) {
    return _.isString(val) || _.isNumber(val) || _.isBoolean(val);
}

module.exports = {
    isBasicValue: isBasicValue
};
