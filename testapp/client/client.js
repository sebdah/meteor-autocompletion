/**
* Template - search
*/
Template.results.results = function () {
  return Session.get('results');
}

Template.search.events = {
  'keyup input#searchBox': function (event) {
    if (!$('input#searchBox').val())
      return

    var phrase = ".*" + $('input#searchBox').val() + ".*";
    console.log('Searching for "' + phrase + '"');

    var results = Friends.find(
      {
        name: { $regex: phrase, $options: 'i' }
      }).fetch();

    Session.set('results', results);
  }
}