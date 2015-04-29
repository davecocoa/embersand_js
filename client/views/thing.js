var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.thing,
    bindings: {
        'model.name': [
            {
                type: 'text',
                hook: 'name-display'
            },
            {
                type: 'value',
                hook: 'name-input'
            }
        ],
        'model.editing': {
            type: 'toggle',
            hook: 'name-input'
        },
        'model.notEditing': {
            type: 'toggle',
            hook: 'name-display'
        }
    },
    events: {
        'click [data-hook=action-delete-thing]': 'handleRemoveClick',
        'click [data-hook=action-edit-thing]': 'editThing'
    },
    handleRemoveClick: function () {
        this.model.destroy();
        return false;
    },
    editThing: function(){
        this.model.toggle("editing");
        if(this.model.editing === false) {
            this.model.name = this.queryByHook('name-input').value;
            this.model.save();
        }
    }
});
