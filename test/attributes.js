var XMLSchema = require('../');

describe('Attributes', function() {
    it('should correctly append attributes', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            attributes: {
                key: {}
            }
        });

        xmlSchema.generate({
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>');
    });

    it('should correctly use specified name', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            attributes: {
                key: { name:"key2" }
            }
        });

        xmlSchema.generate({
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key2="test"/>');
    });

    it('should correctly transform value', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            attributes: {
                key: { transform: function(v) { return v+1; } }
            }
        });

        xmlSchema.generate({
            key: 1
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="2"/>');
    });

    it('should correctly default value', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            attributes: {
                key: { default: 'test' }
            }
        });

        xmlSchema.generate().should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>');
    });
});
