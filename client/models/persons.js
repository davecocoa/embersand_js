var Collection = require('ampersand-rest-collection');
var Person = require('./person');
var app = require('ampersand-app');


module.exports = Collection.extend({
    model: Person,
    url: '/api/people',
    parse: function(response){
	app.thingStore.add(response.things);
        return response.persons;
    }
});
