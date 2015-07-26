var _ = require('lodash');
var utils = require('./utils');

// Create element and apply shcema
function createElement(feed, schema, value) {
    if (schema.bool && !value) return;

    var el = feed.ele(schema.tag);
    if (!schema.bool) applySchema(el, schema, value);
}

// Apply an attribute-schema to an element
function createAttr(el, schema, value) {
    schema = utils.defaultAttribute(schema || {});

    // Apply default value
    if (schema.default !== undefined) {
        value = _.isPlainObject(value)? _.defaults(value, schema.default || {}) : (value || schema.default);
    }

    if (value === null || value == undefined) return

    // Transform value
    value = schema.transform(value);

    // Add attribute
    el.att(schema.name, value);
}


// Apply a schema to an existing element
function applySchema(el, schema, value) {
    var innerValue;
    schema = utils.defaultSchema(schema || {});

    // Apply default value
    if (schema.default !== undefined) {
        value = _.isPlainObject(value)? _.defaults(value, schema.default || {}) : (value || schema.default);
    }

    if (value === null || value == undefined) {
        el.remove();
        return;
    }

    // Map value
    if (schema.map.to && utils.isBasicValue(value)) {
        value = _.object([[schema.map.to, value]]);
    }

    // Transform value
    value = schema.transform(value);

    innerValue = value;

    schema.value = value;
    var isText = _.result(schema, 'text', true);
    var isRaw = _.result(schema, 'raw', false);

    // Extract inner value
    if (schema.inner) innerValue = _.get(innerValue, schema.inner);

    // Add value if string or number
    if (isText && utils.isBasicValue(innerValue)) {
        if (isRaw) el.raw(innerValue);
        else el.txt(innerValue);
    }

    // Apply attributes
    _.each(schema.attributes, function(attr, key) {
        var val = _.get(value, key);
        createAttr(el, _.defaults(attr, {
            name: key
        }), val);
    });

    // Apply sub-fields
    _.each(schema.fields, function(field, key) {
        // Extract value to use for the field
        var val = key == '$'? value : _.get(value, key);

        // Create new element and handle arrays
        if (_.isArray(val)) {
            _.each(val, _.partial(createElement, el, field));
        } else {
            createElement(el, _.defaults(field, {
                tag: key
            }), val);
        }
    });
}

module.exports = {
    createElement: createElement,
    applySchema: applySchema
};
