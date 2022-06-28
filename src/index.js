var http = require("http");
const express = require("express");
const path = require("path");
//const bodyParser = require("body-parser");

const PORT = 8080;

const root_route = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

app.use("/", root_route);

var server = http.createServer(app);
server.listen(PORT, function() {
    console.log("server running at port: " + PORT);
});
