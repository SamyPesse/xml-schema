
describe('Attributes', function() {
    it('should correctly append attributes', function() {
        xmlSchema.create({
            tag: "basic",
            attributes: {
                key: {}
            }
        }, {
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>');
    });

    it('should correctly use specified name', function() {
        xmlSchema.create({
            tag: "basic",
            attributes: {
                key: { name:"key2" }
            }
        }, {
            key: 'test'
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key2="test"/>');
    });

    it('should correctly transform value', function() {
        xmlSchema.create({
            tag: "basic",
            attributes: {
                key: { transform: function(v) { return v+1; } }
            }
        }, {
            key: 1
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="2"/>');
    });

    it('should correctly default value', function() {
        xmlSchema.create({
            tag: "basic",
            attributes: {
                key: { default: 'test' }
            }
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>');
    });
});
