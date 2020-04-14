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

redis_client.on('connect', function () {
    console.log('connected');
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
redis_client.auth(process.env.REDISPASSWORD);
app.use(bodyParser.json());
app.use(timeout("60s"));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://" + process.env.DBUSERNAME + ":" + process.env.DBPASSWORD + "@cluster0-0cl3l.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Models

var showSchema = new mongoose.Schema({
    name: { type: String, default: 'New Show' }
});

var Show = new mongoose.model("Show", showSchema);


// ===========================================================

// ===========================================================

app.post("/shows/post", function (req, res) {
    Show.create({
        name: req.body.name
    }, function (err, show) {
        if (err) {
            console.log(err);
            return res.status(500).json(error);
        }
        else {
            var data = {
                name: show.name,
                id: show._id
            }
            var response = {
                status: 'success',
                message: ' Saved into the database',
                data: data
            }
            redis_client.set(show._id.toString(), JSON.stringify(data), 'EX', 10, function(err, reply) {
                console.log(reply);
            });
            return res.status(200).json(response);
        }
    });
});

app.get("/shows/get/:id", function(req, res) {
    redis_client.get(req.params.id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
            data = JSON.parse(data);
            var response = {
                status: 'success',
                message: 'Show retrieved from the cache',
                data: {
                    name: data.name,
                    id: data.id                
                }
            }
            redis_client.set(data.id, JSON.stringify(data), 'EX', 10, function (err, reply) {
                console.log(reply);
            });

            return res.status(200).json(response);
        } else {
            Show.findById(req.params.id, function (err, show) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                else {
                    var data = {
                        name: show.name,
                        id: show._id
                    } 
                    var response = {
                        status: 'success',
                        message: 'Show retrieved from the database',
                        data: data
                    }
                    redis_client.set(show._id.toString(), JSON.stringify(data), 'EX', 10, function (err, reply) {
                        console.log(reply);
                    });
                    return res.status(200).json(response);
                }
            });
        }
    });
});

app.post("/shows/update/:id", function(req, res) {
    Show.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, function(err, show) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        else {
            var data = {
                name: req.body.name,
                id: show._id
            }
            var response = {
                status: 'success',
                message: 'Show update in the database',
                data: data
            }
            redis_client.del(show._id.toString());
            return res.status(200).json(response);
        }
    });
});


var port = process.env.PORT || 8090;

app.listen(8090, process.env.IP, function (req, res) {
    console.log("The Backend Service has started!");
});