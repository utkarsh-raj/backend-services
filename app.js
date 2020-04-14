// Import modules

var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    queryString = require("querystring"),
    request = require("request"),
    redis = require("redis"),
    axios = require("axios"),
    timeout = require("connect-timeout");

// Application setup

require('dotenv').config();

var app = express();
var redis_client = redis.createClient(process.env.PORT || 6379);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
redis_client.auth(process.env.REDISPASSWORD);
app.use(bodyParser.json());
app.use(timeout("60s"));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://" + process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + "@cluster0-0cl3l.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Models

var jobSchema = new mongoose.Schema({
    name: { type: String, default: 'New Job' }
});


// ===========================================================

var port = process.env.PORT || 8090;

app.listen(8090, process.env.IP, function (req, res) {
    console.log("The Backend Service has started!");
});