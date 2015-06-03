# xml-schema

[![NPM version](https://badge.fury.io/js/xml-schema.svg)](http://badge.fury.io/js/xml-schema)
[![Build Status](https://travis-ci.org/SamyPesse/xml-schema.png?branch=master)](https://travis-ci.org/SamyPesse/xml-schema)

Library to translate JSON objects to XML using predefined JavaScript schemas.

For example, This library is used in [opds-builder](https://github.com/GitbookIO/opds-builder) and [onix-builder](https://github.com/GitbookIO/onix-builder).

### Installation

```
$ npm install xml-schema
```

### Example to generate an ATOM feed

```js
var xmlSchema = require("xml-schema");
```

Define the JavaScript schemas for the ATOM feed:

```js
var DATE = {
    transform: function(d) {
        return (new Date(d)).toISOString();
    }
};

var AUTHOR = {
    tag: 'author',
    fields: {
        name: {},
        uri: {},
        email: {}
    },
    map: {
        to: 'name'
    }
};

var LINK = {
    tag: 'link',
    attributes: {
        href: {},
        rel: {},
        type: {}
    },
    map: {
        to: 'href'
    }
};

var ENTRY = {
    tag: 'entry',
    fields: {
        title: {},
        updated: DATE,
        summary: {},
        links: LINK,
        authors: AUTHOR,
        author: AUTHOR,
        content: {
            raw: true,
            attributes: {
                type: {
                    default: "xhtml"
                }
            }
        }
    }
};

var FEED = {
    tag: 'feed',
    attributes: {
        xmlns: {
            default: "http://www.w3.org/2005/Atom"
        }
    },
    fields: {
        title: {},
        updated: DATE,
        links: LINK,
        entries: ENTRY,
        authors: AUTHOR,
        author: AUTHOR
    }
};
```

Convert JSON into XML based on the previously defined schema:

```js
var xml = xmlSchema.create(
    // Schema to use for the xml
    FEED,

    // Data to process
    {
        title: "Example Feed",
        links: [
            {
                href: "http://example.org/feed/",
                ref: "self"
            },
            "http://example.org/"
        ],
        entries: [
            {
                title: "Atom-Powered Robots Run Amok",
                updated: new Date(2015, 01, 15),
                links: [
                    "http://example.org/2003/12/13/atom03",
                    {
                        rel: "alternate",
                        type: "text/html",
                        href: "http://example.org/2003/12/13/atom03.html"
                    },
                    {
                        rel: "edit",
                        href: "http://example.org/2003/12/13/atom03/edit"
                    }
                ],
                author: {
                    name: "John Doe",
                    email: "johndoe@example.com"
                },
                content: "<p>This is the entry content.</p>"
            }
        ]
    },
    // Options for xmlSchema
    {
        version: '1.0',
        encoding: 'UTF-8'
    }
);
```

### Options for schemas

```js
{
    // Name of the element tag
    // If null, it will use the name of the fields
    tag: "myTag",

    // Use sub-value as text/raw node (default is undefined)
    inner: undefined,

    // Map of sub-elements defined by schema
    fields: {
        // Key can be the path of the property to get (eg: "a[0].b.c")
        // If "$", then the value is the one passed to the schema
        "key": anotherSchema
    },

    // Map of attributes
    // It works like "fields", options 'transform', 'default' are also available
    attributes: {
        "key2": {
            name: "attributeName",
            default: "attributeValue"
        }
    },

    // Map basic value (number, string, boolean) to object for the schema
    // This is usefull to make it easier to define both simple and complex data set
    map: {
        to: "key"
    },

    // Default value for the schema (default is undefined)
    default: "some stuff",

    // Transformation function for the value (default is identity)
    transform: function(v) { return v; },

    // If true, Don't escape value when appened (default is false)
    raw: false,

    // If true, Append the resulting value as text (default is true)
    text: true
}
```

### Options for `xmlSchema`

```js
{
    // xml version to append in the header
    "versions":"1.0",

    // encoding value to append in the header
    "encoding": "UTF-8",

    "standalone": false,

    // If true, it will return a pretty xml string
    "pretty": true
}
```
