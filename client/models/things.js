var Collection = require('ampersand-rest-collection');
var Thing = require('./thing');


module.exports = Collection.extend({
    model: Thing,
    url: function(){
      return this.parent.url() + '/things';
    }
});
