TrelloCal.Models.Task = Backbone.Model.extend({
    initialize: function() {},

    defaults: {
        name: '',
        id: '',
    }
});


TrelloCal.Collections.Tasks = Backbone.Collection.extend({
    model: TrelloCal.Models.Task,
});


TrelloCal.Views.Task = Backbone.View.extend({
    el: '#sidebar-list',
    template: _.template($("#sidebar-template").html()),

    initialize: function() {},

    render: function() {
        this.$el.append(this.template(this.model.attributes));
        return this;
    }
});

TrelloCal.Views.Tasks = Backbone.View.extend({
    el: '#sidebar',
    collection: null,

    events: {
        "click button": "clicked"
    },

    clicked: function(e) {
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        var task = this.collection.get(id);
        var name = task.get("name");
        var newEvent = new TrelloCal.Models.Event({name: name, task: task});
        window.events.add(newEvent);
    },

    initialize: function(options) {
        this.collection = options.collection;
        this.collection.on('add', this.renderOne, this);
    },

    renderOne: function(task) {
        var taskView = new TrelloCal.Views.Task({model: task});
        taskView.render();
    },

    render: function() {
        this.collection.forEach(function(task) {
            // Should be replaced with this.renderOne(task);
            // which for some reason is erroring: 'this.renderOne is not a function'.
            var taskView = new TrelloCal.Views.Task({model: task});
            taskView.render();
        });
    },
});