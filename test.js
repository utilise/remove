var expect = require('chai').expect
  , remove = require('./')

describe('remove', function() {

  it('should remove by identity', function() {
    var a = [1,2,3]
    a.forEach(remove(2))
    expect(a).to.be.eql([1,3])
  })

  it('should remove by property', function() {
    var a = [{i:1},{i:2},{i:3}]
    a.forEach(remove('i', 2))
    expect(a).to.be.eql([{i:1},{i:3}])
  })

})