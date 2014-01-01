function autocompleteInit (element) {
  $(element).autocomplete({ source: []});
}

function autocompleter (config) {
  if (typeof(config) === 'undefined'){
    console.log('Missing required config parameter in autocompleter()');
    return
  }

  // Build the query
  query = {};
  query[config['field']] = {
    $regex: ".*" + $(config['element']).val() + ".*",
    $options: 'i'};

  // Build filtering
  filter = {};
  filter['limit'] = config['limit'];
  filter['sort'] = config['sort'];
  filter['fields'] = {};
  filter['fields'][config['field']] = 1; // Only include the searchable
                                         // field in the result

  // Find all results
  results = config['collection'].find(query, filter).fetch();

  // Get the name parameter from the results
  autocompleteResults = []
  for (var i = results.length - 1; i >= 0; i--) {
    autocompleteResults[i] = results[i][config['field']];
  };

  // Update the autocomplete result list
  $(config['element']).autocomplete({ source: autocompleteResults });
}

/**
* Template - search
*/
Template.search.rendered = function () {
  autocompleteInit("input#searchBox");
}

Template.search.events = {
  'keyup input#searchBox': function () {
    autocompleter({
      element: "input#searchBox",   // DOM identifier for the element
      collection: Friends,          // MeteorJS collection object
      field: "name",                // Document field name to search for
      limit: 0,                     // Max number of elements to show
      sort: {name: 1}});            // Sort object to filter results with
  }
}