/**
* Template - search
*/
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

    autocompleteResults = []
    for (var i = results.length - 1; i >= 0; i--) {
      autocompleteResults[i] = results[i].name;
    };

    $("input#searchBox").autocomplete({ source: autocompleteResults });
  }
}