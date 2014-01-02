/**
* Template - search
*/
Template.search.rendered = function () {
  AutoCompletion.enableLogging = true;
  AutoCompletion.init("input#searchBox");
}

Template.search.events = {
  'keyup input#searchBox': function () {
    AutoCompletion.autocomplete({
      element: 'input#searchBox',       // DOM identifier for the element
      collection: Friends,              // MeteorJS collection object
      field: 'name',                    // Document field name to search for
      limit: 0,                         // Max number of elements to show
      sort: { name: 1 }});              // Sort object to filter results with
      //filter: { 'gender': 'female' }}); // Additional filtering
  }
}