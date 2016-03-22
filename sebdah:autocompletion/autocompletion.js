AutoCompletion = {};

AutoCompletion.enableLogging = false;

var log = function (level, message) {
  if (AutoCompletion.enableLogging)
    console.log('AutoCompletion - ' + level + ' - ' + message);
}

var logObj = function (obj) {
  if (AutoCompletion.enableLogging)
    console.dir(obj);
}

/**
 * Initialize element with jQueryUI autocomplete
 * @param element
 */
AutoCompletion.init = function (element) {
  $(element).autocomplete({ source: []});
  log('INFO', 'Initalized element(s) identified by ' + element);
}

/**
 * Run a database query to find all objects and populate the autocomplete box
 * @param config
 */
AutoCompletion.autocomplete = function (config) {
  if (typeof(config) === 'undefined'){
    log('ERROR', 'Missing required config parameter in autocompleter()');
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
  log('DEBUG', 'Query object: ');
  logObj(query);

  // Build filtering
  filter = {};
  filter['limit'] = config['limit'];
  filter['sort'] = config['sort'];
  filter['fields'] = {};
  filter['fields'][config['field']] = 1; // Only include the searchable
                                         // field in the result
  log('DEBUG', 'Filter object: ');
  logObj(filter);

  // Find all results
  results = config['collection'].find(query, filter).fetch();
  log('DEBUG', 'Results object: ');
  logObj(results);
  
   if(config['distinctElements'] == true) {
    results = _.uniq(myArray, false, function(d) {return d.config['field']});
  }

  // Get the name parameter from the results
  autocompleteResults = []
  for (var i = results.length - 1; i >= 0; i--) {
    autocompleteResults[i] = results[i][config['field']];
  };

  // Update the autocomplete result list
  if(config['onselect']) {
	    $(config['element']).autocomplete({ 
		      source: autocompleteResults ,
		      select: config['onselect']
	    });
  }
  else {
	    $(config['element']).autocomplete({ source: autocompleteResults });
  }
}

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
var mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
