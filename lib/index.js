var _ = require('lodash');
var builder = require('xmlbuilder');

var utils = require('./utils');
var generate = require('./generate');
var parse = require('./parse');

function XMLSchema(schema) {
    this.schema = schema;
}

// Create a xml string from a schema
XMLSchema.prototype.generate = function(value, options, doctype) {
    options = _.defaults(options || {}, {
        version: '1.0',
        encoding: 'UTF-8',
        standalone: false,
        pretty: false
    });

    var xml = builder.create(this.schema.tag, {
        version: options.version,
        encoding: options.encoding,
        standalone: options.standalone
    }, doctype);

    generate.applySchema(xml, this.schema, value || {});

    return xml.end({
        pretty: options.pretty
    });
};

// Parse a xml tring
XMLSchema.prototype.parse = function(xml) {
    return parse.applySchema(xml, this.schema);
};


module.exports = XMLSchema;
