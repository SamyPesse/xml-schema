var _ = require('lodash');
var xmlparse = require('xml-parser');

var utils = require('./utils');

// Using a schema, parse an element
function parseElement(el, schema) {
    var output = {};
    schema = utils.defaultSchema(schema || {});

    // Extract attributes
    if (schema.attributes) {
        _.each(schema.attributes, function(attr, name) {
            attr = utils.defaultAttribute(attr || {});

            var attrName = attr.name || name;
            var value = el.attributes[attrName] || attr.default;

            // Untransform value
            value = attr.untransform(value);

            // Set the value
            _.set(output, name, value);
        });
    }

    // Extract fields
    if (schema.fields) {
        _.each(schema.fields, function(field, name) {
            var value;
            var tagName = field.tag || name;

            // Extract all tags
            var tags = _.filter(el.children, { name: tagName });

            // Only check that element exists
            if (field.bool) {
                value = (tags.length > 0);
            } else {
                if (tags.length == 0) return;

                // Map tags to values
                var values = _.map(tags, function(tag) {
                    return parseElement(tag, field);
                });

                // Normalize to one value if not an array
                if (!field.array) value = values.length == 1? values[0] : values;
                else value = values;
            }

            // Set the value
            if (name == '$') _.extend(output, value);
            else _.set(output, name, value);
        });
    }

    // Extract main value if text node
    if (el.content !== undefined && el.children.length == 0 && schema.text) {
        var value = el.content;

        // Untransform value
        value = schema.untransform(value);

        return value;
    }

    return output;
}


function applySchema(xml, schema) {
    var output = {};
    xml = xmlparse(xml);

    // Check that is valid xml
    if (!xml.root) throw "Invalid XML";

    // Check that tag name match
    if (schema.tag != xml.root.name) throw "Tag name doesn't match the schema: "+schema.tag+" != "+xml.root.name;

    return parseElement(xml.root, schema);
}


module.exports = {
    applySchema: applySchema
};
