var _ = require('lodash');

var people = [
    {
        id: 1,
        firstName: 'Henrik',
        lastName: 'Joreteg',
        things: [1, 2],
        coolnessFactor: 11
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Saget',
        things: [3],
        coolnessFactor: 2
    },
    {
        id: 3,
        firstName: 'Larry',
        lastName: 'King',
        things: [2,3],
        coolnessFactor: 4
    },
    {
        id: 4,
        firstName: 'Diana',
        lastName: 'Ross',
        things: [],
        coolnessFactor: 6
    },
    {
        id: 5,
        firstName: 'Crazy',
        lastName: 'Dave',
        things: [],
        coolnessFactor: 8
    },
    {
        id: 6,
        firstName: 'Larry',
        lastName: 'Johannson',
        things: [],
        coolnessFactor: 4
    }
];

var things = [
    {
        id: 1,
        name: 'garbage'
    },
    {
        id: 2,
        name: 'magic'
    },
    {
        id: 3,
        name: 'enthusiasm'
    }
];

var id = 7;
var thingId = 4;

function get(id) {
    return _.findWhere(people, {id: parseInt(id + '', 10)});
}

function getThing(id, things) {
    return _.findWhere(things, {id: parseInt(id + '', 10)});
}

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/api/people',
        handler: function (request, reply) {
            reply({persons: people, things: things});
        }
    });

    server.route({
        method: 'POST',
        path: '/api/people',
        handler: function (request, reply) {
            var person = request.payload;
            person.id = id++;
            person.things = [];
            people.push(person);
            reply({person: person}).code(201);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            reply({person: found, things: things}).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) people = _.without(people, found);
            reply({person: found}).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/people/{id}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            if (found) _.extend(found, request.payload);
            reply({person: found}).code(found ? 200 : 404);
        }
    });






    server.route({
        method: 'POST',
        path: '/api/people/{id}/things',
        handler: function (request, reply) {
            var thing = request.payload;
            thing.id = thingId++;
            var found = get(request.params.id);
            found.things.push(thing);
            reply({thing: thing}).code(201);
        }
    });

    server.route({
        method: 'GET',
        path: '/api/people/{id}/things',
        handler: function (request, reply) {
            var found = get(request.params.id);
            reply({things: found.things}).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/api/people/{id}/things/{thingId}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            var foundThing = getThing(request.params.thingId, found.things);
            if (foundThing) found.things = _.without(found.things, foundThing);
            reply({thing: foundThing}).code(found ? 200 : 404);
        }
    });

    server.route({
        method: 'PUT',
        path: '/api/people/{id}/things/{thingId}',
        handler: function (request, reply) {
            var found = get(request.params.id);
            var foundThing = getThing(request.params.thingId, found.things);
            if (foundThing) _.extend(foundThing, request.payload);
            reply({thing: foundThing}).code(found ? 200 : 404);
        }
    });

    next();
};

exports.register.attributes = {
    version: '0.0.0',
    name: 'fake_api'
};
