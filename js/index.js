$(document).ready(function($) {
  var $search = $('#search');
  var $results = $('#results');
  
// For autocomplete if I ever get around to implementing it
/*$.ajax({
  url: "http://en.wikipedia.org/w/api.php",
  dataType: "jsonp",
  data: {
    'action': "opensearch",
    'format': "json",
    'search': $search.val()
  }*/
          
  $search.keyup (function() {
    var searchQuery = $search.val();
    
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exchars: '200',
        exlimit: 'max',
        explaintext: '',
        exintro: '',
        pilimit: 'max',
        rawcontinue: '',
        generator: 'search',
        gsrsearch: searchQuery,
        gsrnamespace: '0',
        gsrlimit: '10'
      },
      success: function(data) {
        $results.empty();
        var pages = data.query.pages;
        //console.log(pages);
        for (var page in pages) {
          $results.append(
            '<a href="https://en.wikipedia.org/wiki/' + pages[page].title + '" target="_blank">' +
              '<article id="result">' + 
                '<h2>' + pages[page].title + '</h2>' +
                '<p>' + pages[page].extract + '</p>' +
              '</article>' +
            '</a>'
          );
        }
      }
    });
  });
});