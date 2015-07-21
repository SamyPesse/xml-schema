
describe('Parsing', function() {
    it('should correctly parse attributes of root', function() {
        var xmlSchema = new XMLSchema({
            tag: "basic",
            attributes: {
                key: {}
            }
        });

        xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>').should.eql({ key: "test" });
    });
});
