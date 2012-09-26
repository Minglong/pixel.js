
var fs = require("fs")
  , jsdom = require("jsdom");

var html = fs.readFileSync(__dirname + "/index.html", "utf8");
var doc = jsdom.jsdom(html);

//doc = jsdom.jsdom("\
//<html lang='en'>\
//    <head>\
//    <meta name='keywords' content='cat, dog' />\
//    <meta http-equiv='Content-Language' content='es' />\
//    </head>\
//    <body>\
//        <div id='main'></div>\
//    </body>\
//</html>\
//");

module.exports = doc.createWindow();
//global.window = doc.createWindow();
