var expect = require('chai').expect
  , remove = require('./')
  , last = require('utilise.last')
  , set = require('utilise.set')

describe('remove', function() {

  it('should remove - vanilla', function() {
    expect(remove(0)(['foo'])).to.be.eql([])
  })

  it('should remove - array', function(){
    var o = set()(['foo', 'bar', 'baz'])

    expect(remove(1)(o)).to.equal(o)
    expect(o).to.eql(['foo', 'baz'])
    expect(o.log.length).to.eql(2)
    expect(last(o.log)).to.eql({ key: '1', value: 'bar', type: 'remove', time: 1 })
  })
    
  it('should remove - object', function(){
    var o = set()({ foo: 'bar' })

    expect(remove('foo')(o)).to.equal(o)
    expect(o).to.eql({})
    expect(o.log.length).to.eql(2)
    expect(last(o.log)).to.eql({ key: 'foo', value: 'bar', type: 'remove', time: 1 })
  })  

  it('should skip gracefully', function(){
    expect(remove('foo')(true)).to.be.eql(true)
    expect(remove('foo')(5)).to.be.eql(5)
  })

  it('should work deeply', function() {
    var o = set()({ a: { b: { c: 5 }}})

    remove('a.b.c')(o)
    expect(o).to.eql({ a: { b: {}}})
    expect(o.log.length).to.eql(2)
    expect(last(o.log)).to.eql({ key: 'a.b.c', value: 5, type: 'remove', time: 1 })
  })

})