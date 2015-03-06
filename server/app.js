//server only code

Meteor.startup(function () {
  seed();
});

function clear() {
  Cards.remove({});
  Lists.remove({});
}

function seed() {
  if (Cards.find().count() === 0) {
    var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
      "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
    _.each(names, function (name) {
      Cards.insert({
        name: name
      });
    });
  }

  if (Lists.find().count() === 0) {
    var cardIds = _.pluck(Cards.find().fetch(), "_id");
    for (var i=0; i<3; i++) {
      addList(i + 1, (i===0 ? cardIds : null));
    }
  }
}

function addList(i, cardIds) {
  Lists.insert({
    name: "List " + i,
    cards: cardIds || []
  });
}

Meteor.methods({

  addList: function() {
      addList(Lists.find().count() + 1);
  },

  reset: function() {
    clear();
    seed();
  }
})