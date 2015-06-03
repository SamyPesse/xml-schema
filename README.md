# xml-schema

[![NPM version](https://badge.fury.io/js/xml-schema.svg)](http://badge.fury.io/js/xml-schema)
[![Build Status](https://travis-ci.org/SamyPesse/xml-schema.png?branch=master)](https://travis-ci.org/SamyPesse/xml-schema)

Library to translate JSON objects to XML using predefined JavaScript schemas.

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
    fields: {
        href: {},
        rel: {},
        type: {}
    },
    map: {
        href: 'name'
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

### Options

- **version**: xml version to append in the header (default is `"1.0"`)
- **encoding**: encoding value to append in the header (default is `"UTF-8"`)
- **standalone**: (default is `true`)
- **pretty**: If true, it will return a pretty xml string (default is `false`)
