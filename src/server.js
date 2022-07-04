var http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const uuid = require("uuid");
const chokidar = require('chokidar');
const clientID = uuid.v4();
const PORT = 8003;

const {combineFiles, onFileContent, onError, componentsFolder} = require("./utils/combine");

const data = require("./data.js");
const routes = require("./routes/index");

const bodyParser = require("body-parser");

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static("src/public"));

io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        console.log("SOCKET DISCONNECTED");
    });
});
app.use("/", routes(data, io, clientID));

const dynWatcher = chokidar.watch(componentsFolder, {
    ignored: /\.html|all\.js|(^|[\/\\])\../
});

dynWatcher.on('change', (event, path) => {
    combineFiles(componentsFolder, onFileContent, onError);
});

server.listen(PORT, () => {
    console.log("server running at port: " + PORT);
});
