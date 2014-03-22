meteor-autocompletion
=====================

`meteor-autocompletion` provides simple, easy-to-use autocompletion to `<input>` fields in [MeteorJS](https://meteor.com). The package will search for the inputed text in a client-side Meteor collection and return similar results. Results can be selected using the arrow keys and Enter, or by clicking with the mouse.

![Autocompleting a name](https://raw.github.com/sebdah/meteor-autocompletion/master/docs/example.png)

**Using the package? Please star this repo!**
**Gratefully receiving donations at [Gittip](https://www.gittip.com/sebdah/).**

Installation
------------

Install `meteor-autocompletion` using [Meteorite](http://oortcloud.github.io/meteorite/):

    mrt add autocompletion

Configuration
-------------

We will use a collection called `Friends` in the example below to search for names when typing in the `<input>` field.

Check out the MeteorJS example app in the `example` directory for a full example.

### Example client HTML

Add an `<input>` field to your template with an `id` attribute:

    <head>
      <title>meteor-autocompletion test app</title>
    </head>

    <body>
      <h1>meteor-autocomplete test app</h1>
      {{>search}}
    </body>

    <template name="search">
      <h3>Search</h3>
      <input type="text" id="searchBox">
    </template>

### Example client JavaScript

Then add JavaScript code similar to the below.

    /**
    * Template - search
    */
    Template.search.rendered = function () {
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

Take extra care looking at the parameters to `AutoCompletion.autocomplete`. We are in this example fetching data from the element with the id `input#searchBox`. We will then match the text with the `name` field in the `Friends` collection. You can limit the number of returned rows using `limit` and send any sorting directions using `sort`. In this case, we're sorting the names from A to Z.

### Configuration options

The following configuration options can be sent to `AutoCompletion.autocomplete`:

    Option      Required  Comment
    -------------------------------------------------------------------------
    element     Yes       DOM identifier for the element
    collection  Yes       MeteorJS collection object
    field       Yes       Field name in the collection to search
    limit       No        Limit the number of results (`0` gives all results)
    sort        No        Pass a MongoDB sorting object to the query
    filter      No        Pass additional filtering rules to the query

### Enable debug output

You can enable debug output by adding the following to your `Template.template_name.rendered` function:

    AutoCompletion.enableLogging = true;

Current limitations
-------------------
* Only one collection can be searched. For searching in multiple collections, see the [autocomplete](https://atmosphere.meteor.com/package/autocomplete) package.
* Searching is only done among the records of the collection that area loaded on the client. To search in large collections that are stored on the server, see the [autocomplete](https://beta.atmospherejs.com/package/autocomplete) package.
* Searching is done only in one field of the collection
* Search results are simply the values of matching fields. For customized search results using a template ([example](http://twitter.github.io/typeahead.js/examples/)), see the [typeahead](https://atmosphere.meteor.com/package/typeahead) package.

Author
------

This project is maintained by [Sebastian Dahlgren](http://www.sebastiandahlgren.se) ([GitHub](https://github.com/sebdah) | [Twitter](https://twitter.com/sebdah) | [LinkedIn](http://www.linkedin.com/in/sebastiandahlgren))

Gratefully receiving donations at [Gittip](https://www.gittip.com/sebdah/).
