
describe('Basic', function() {
    var xmlSchema = new XMLSchema({
        tag: "basic"
    });

    it('should return an empty feed', function() {
        xmlSchema.generate().should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic/>');
    });
});
