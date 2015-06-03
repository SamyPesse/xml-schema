
describe('Basic', function() {
    it('should return an empty feed', function() {
        xmlSchema.create({
            tag: "basic"
        }).should.equal('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic/>');
    });
});
