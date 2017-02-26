var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("index");
});

app.get("/request", function(req, res){
  var data;
  var query = req.query.search;
  var page = req.query.page;
  var url = "http://www.omdbapi.com/?s="+query+"&page="+page;
  request(url, function(error, response, body){
    if (!error && response.statusCode === 200) {
      data = JSON.parse(body);
      console.log(data);
      res.render("movie", {data: data.Search, code: response.statusCode});
    }else{
      data = error;
      res.render("movie", {data: data});
    }
  });

});

app.listen(3000, function(){
  console.log("Server has been started!");
});
