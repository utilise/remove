var set = require('utilise.set')
  
module.exports = function remove(key){
  return function(o){
    return set({ key: key, value: o[key], type: 'remove' })(o)
  }
}