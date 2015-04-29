var View = require('ampersand-view');
var templates = require('../templates');
var CollectionRenderer = require('ampersand-collection-view');
var ThingView = require('./thing');


module.exports = View.extend({
    template: templates.includes.person,
    bindings: {
        'model.fullName': '[data-hook~=name]',
        'model.avatar': {
            type: 'attribute',
            hook: 'avatar',
            name: 'src'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'action-edit',
            name: 'href'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'name',
            name: 'href'
        }
    },
    subviews: {
        things: {
            container: '[data-hook=things-container]',
            waitFor: 'model.things',
            prepareView: function(el){
                return new CollectionRenderer({
                    el: el,
                    view: ThingView,
                    collection: this.model.things
                });
            }
        }
    },
    events: {
        'click [data-hook~=action-delete]': 'handleRemoveClick',
        'click [data-hook~=action-add-thing]': 'addThing'
    },
    handleRemoveClick: function () {
        this.model.destroy();
        return false;
    },
    addThing: function(){
        function getRandom(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        var thingNames = 'magic trash spells onion giraffe cloud etch-a-sketch'.split(' ');

        this.model.things.create({
            name: thingNames[getRandom(0, thingNames.length - 1)],
        });
    }
});
