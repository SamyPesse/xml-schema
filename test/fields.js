
describe('Fields', function() {
    it('should correctly append children', function() {
        xmlSchema.create({
            tag: "basic",
            fields: {
                key: {}
            }
        }, {
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>');
    });

    it('should correctly use specified tag', function() {
        xmlSchema.create({
            tag: "basic",
            fields: {
                key: {
                    tag: 'test'
                }
            }
        }, {
            key: 'hello'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><test>hello</test></basic>');
    });

    it('should correctly transform value', function() {
        xmlSchema.create({
            tag: "basic",
            fields: {
                key: {
                    transform: function(v) { return v+1; }
                }
            }
        }, {
            key: 1
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>2</key></basic>');
    });

    it('should correctly append default fields', function() {
        xmlSchema.create({
            tag: "basic",
            fields: {
                key: {
                    default: 'test'
                }
            }
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>');
    });
});
