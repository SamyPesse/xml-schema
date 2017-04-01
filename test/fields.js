var XMLSchema = require('../');

describe('Fields', function() {
    it('should correctly append children', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {}
            }
        });

        xmlSchema.generate({
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>');
    });

    it('should correctly use specified tag', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {
                    tag: 'test'
                }
            }
        });

        xmlSchema.generate({
            key: 'hello'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><test>hello</test></basic>');
    });

    it('should correctly handle "$"', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {
                    fields: {
                        '$': {
                            tag: "key 2",
                            attributes: {
                                message: {}
                            }
                        }
                    }
                }
            }
        });

        xmlSchema.generate({
            key: {
                message: "hello"
            }
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key><key 2 message="hello"/></key></basic>');
    });

    it('should correctly transform value', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {
                    transform: function(v) { return v+1; }
                }
            }
        });

        xmlSchema.generate({
            key: 1
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>2</key></basic>');
    });

    it('should correctly append default fields', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {
                    default: 'test'
                }
            }
        });

        xmlSchema.generate().should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>');
    });

    it('should correctly append empty field for bool:true', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            fields: {
                key: {
                    bool: true
                }
            }
        });

        xmlSchema.generate().should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic/>');
        xmlSchema.generate({ key: true }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key/></basic>');
    });
});
