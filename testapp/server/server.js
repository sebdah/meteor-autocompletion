/**
* Startup
*/
var friends = [
  {
    name: 'Annika Magnusson',
    gender: 'female',
    age: 31
  },
  {
    name: 'Sebastian Dahlgren',
    gender: 'male',
    age: 28
  },
  {
    name: 'Sebastien Goose',
    gender: 'male',
    age: 83
  },
  {
    name: 'Stefan Andersson',
    gender: 'male',
    age: 12
  },
  {
    name: 'Syster Sol',
    gender: 'female',
    age: 24
  },
  {
    name: 'Anna Palme',
    gender: 'female',
    age: 56
  },
  {
    name: 'Sofia Jonasson',
    gender: 'female',
    age: 30
  }
]

Meteor.startup(function () {
  for (var i = friends.length - 1; i >= 0; i--) {
    if (Friends.find({name: friends[i].name}).count() == 0) {
      Friends.insert(friends[i]);
      console.log('Added ' + friends[i].name + ' to the database.');
    }
  };
});
