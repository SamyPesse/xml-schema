var _ = require('lodash');

function isBasicValue(val) {
    return _.isString(val) || _.isNumber(val) || _.isBoolean(val);
}

// Default schema
function defaultSchema(schema) {
    return _.defaults(schema || {}, {
        // Use sub-value as text/raw node
        inner: null,

        // Sub elements fields
        fields: {},

        // Attribute for the element
        attributes: {},

        // Value transformation
        transform: _.identity,

        // Default value
        default: undefined,

        // Map basic value to object
        map: {},

        // Add value as text
        text: true,

        // Use raw node instead of escaped text
        raw: false
    });
}

module.exports = {
    isBasicValue: isBasicValue,
    defaultSchema: defaultSchema
};
