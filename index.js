var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
request("http://substack.net/images/", function(error, response, body){
  if(!error && response.statusCode == 200){
    $ = cheerio.load(body);
    var arrayToCsv = []
    $("td").each(function () {
      
      var href = $(this).find("a").attr("href");
      var code = $(this).find("code").html();
      var ext = path.extname(href);
      //console.log("http://substack.net/" + href + " " + code + " " + ext);
      var hrefName = ["http://substack.net", href].join("");
      var line = [hrefName, code, ext].join(",");

      arrayToCsv.push(line);
      console.log(arrayToCsv);
      fs.writeFile("substack.csv", arrayToCsv.join("\n") , function(err){
        if(err) throw err;
      });
    })
  }
});

//request("http://substack.net/images/").pipe(fs.createWriteStream("substack.csv"))