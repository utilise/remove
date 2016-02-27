var versioned = require('versioned').default
  , expect = require('chai').expect
  , remove = require('./')
  , last = require('utilise.last')

describe('remove', function() {

  it('should remove - vanilla', function() {
    expect(remove(0)(['foo'])).to.be.eql([])
  })

  it('should remove - array', function(){
    var changes = []
      , o = versioned(['foo', 'bar', 'baz']).on('log', function(diff){ changes.push(diff) })

    expect(o).to.eql(['foo', 'bar', 'baz'])
    expect(o.log.length).to.eql(1) 
    expect(last(o.log).diff).to.eql(undefined)
    expect(last(o.log).value.toJS()).to.eql(['foo', 'bar', 'baz'])
    expect(changes).to.eql([])

    expect(remove(1)(o)).to.eql(o)
    expect(o).to.eql(['foo', 'baz'])
    expect(o.log.length).to.eql(2)
    expect(last(o.log).diff).to.eql({ key: '1', value: 'bar', type: 'remove' })
    expect(last(o.log).value.toJS()).to.eql(['foo', 'baz'])
    expect(changes).to.eql(o.log.slice(1).map(d => d.diff))
  })
    
  it('should remove - object', function(){
    var changes = []
      , o = versioned({ foo: 'bar' }).on('log', function(diff){ changes.push(diff) })

    expect(o).to.eql({ foo: 'bar' })
    expect(o.log.length).to.eql(1)
    expect(last(o.log).diff).to.eql(undefined)
    expect(last(o.log).value.toJS()).to.eql({ foo: 'bar' })
    expect(changes).to.eql([])

    expect(remove('foo')(o)).to.eql(o)
    expect(o).to.eql({})
    expect(o.log.length).to.eql(2)
    expect(last(o.log).diff).to.eql({ key: 'foo', value: 'bar', type: 'remove' })
    expect(last(o.log).value.toJS()).to.eql({})
    expect(changes).to.eql(o.log.slice(1).map(d => d.diff))
  })  

  it('should skip gracefully', function(){
    expect(remove('foo')(true)).to.be.eql(true)
    expect(remove('foo')(5)).to.be.eql(5)
  })

  it('should work deeply', function() {
    var changes = []
      , o = versioned({ a: { b: { c: 5 }}}).on('log', function(diff){ changes.push(diff) })

    remove('a.b.c')(o)
    expect(o.log.length).to.eql(2)
    expect(last(o.log).diff).to.eql({ key: 'a.b.c', value: 5, type: 'remove' })
    expect(last(o.log).value.toJS()).to.eql({ a: { b: {}}})
    expect(changes).to.eql([
      { key: 'a.b.c', value: 5, type: 'remove' }
    ])
  })

})