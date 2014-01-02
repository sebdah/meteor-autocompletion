AutoCompletion = {};

/**
 * Initialize element with jQueryUI autocomplete
 * @param element
 */
AutoCompletion.init = function (element) {
  $(element).autocomplete({ source: []});
}

/**
 * Run a database query to find all objects and populate the autocomplete box
 * @param config
 */
AutoCompletion.autocomplete = function (config) {
  if (typeof(config) === 'undefined'){
    console.log('Missing required config parameter in autocompleter()');
    return
  }

  // Build the query
  initQuery = {};
  initQuery[config['field']] = {
    $regex: ".*" + $(config['element']).val() + ".*",
    $options: 'i'};
  if (typeof(config['filter']) === 'undefined')
    query = initQuery;
  else
    query = mergeObjects(initQuery, config['filter']);

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
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
AutoCompletion.mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
