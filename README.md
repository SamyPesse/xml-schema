# ONIX for Books

[![NPM version](https://badge.fury.io/js/xml-schema.svg)](http://badge.fury.io/js/xml-schema)
[![Build Status](https://travis-ci.org/SamyPesse/xml-schema.png?branch=master)](https://travis-ci.org/SamyPesse/xml-schema)

Library to translate JSON objects to XML using predefined JavaScript schemas.

### Installation

```
$ npm install xml-schema
```

### How to use it?

Example to generate ATOM feed

```js
var xmlSchema = require("xml-schema");
```

Define the JavaScript schema for a ATOM feed:

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

Then simply convert JSON into XML based on defined schema:

```js
var xml = xmlSchema.create(FEED, {
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

}, {
    xml: {
        version: '1.0',
        encoding: 'UTF-8'
    }
});
```


