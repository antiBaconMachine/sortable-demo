Template.outer.helpers({
    list: function () {
        return Lists.find();
    }
});

Template.outer.events({
    "click .addList" : function(e) {
        Meteor.call("addList");
        return false;
    },
    "click .reset" : function() {
        Meteor.call("reset");
        return false;
    }
});

Template.myList.helpers({
    card: function () {
        var cards = Cards.find({_id: {$in: this.cards}});
        //return cards.count() ? cards : [{empty: "empty", name: "empty"}];
        return cards;
    }
});

Template.myList.rendered = function () {

    $(".step_list").sortable({
        items: ".card",
        delay: 100,
        refreshPositions: true,
        revert: true,
        helper: "clone",
        scroll: true,
        scrollSensitivity: 50,
        scrollSpeed: 35,
        connectWith: ".step_list",
        start: function (event, ui) {
            $(ui.helper).addClass("dragging");
        }, // end of start
        stop: function (event, ui) {
            $(ui.item).removeClass("dragging");
        }, // end of stop
        update: function (event, ui) {
            var index = 0;
            _.each($(".card"), function (item) {
                Cards.update({_id: item.id}, {
                    $set: {
                        pos: index++,
                    }
                });
            });
        }
    }).disableSelection();

};