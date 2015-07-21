var _ = require('lodash');
var xmlparse = require('xml-parser');

// Using a schema, parse an element
function parseElement(el, schema) {
    var output = {};

    // Check that tag name match
    if (schema.tag != el.name) throw "Tag name doesn't match the schema: "+schema.tag+" != "+el.name;

    // Extract attributes
    if (schema.attributes) {
        _.each(schema.attributes, function(attr, name) {
            var attrName = attr.name || name;
            var value = el.attributes[attrName] || attr.default;
            output[name] = value;
        });
    }

    return output;
}


function applySchema(xml, schema) {
    var output = {};
    xml = xmlparse(xml);

    return parseElement(xml.root, schema);
}


module.exports = {
    applySchema: applySchema
};
