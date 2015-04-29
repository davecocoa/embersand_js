var AmpersandModel = require('ampersand-model');

module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, '']
    },
    session: {
        editing: ['boolean', true, false]
    },
    derived: {
        notEditing: {
            deps: ['editing'],
            fn: function(){ return !this.editing; }
        }
    }
});
