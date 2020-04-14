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
var articleSchema = new mongoose.Schema({
    title: { type: String, default: 'New Article' },
    content: { type: String, default: 'New Content' },
    jobId: { type: Number }
});

var Show = new mongoose.model("Show", showSchema);
var Article = new mongoose.model("Article", articleSchema);


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
        console.log(data);
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
                    if (show === null) {
                        var response = {
                            status: 'success',
                            message: 'Not present in the database'
                        }
                        return res.status(200).json(response);
                    }
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

app.put("/shows/update/:id", function(req, res) {
    Show.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, function(err, show) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        else {
            if (show === null) {
                var response = {
                    status: 'success',
                    message: 'Not present in the database'
                }
                return res.status(200).json(response);
            }
            var data = {
                name: req.body.name,
                id: show.id
            }
            var response = {
                status: 'success',
                message: 'Show update in the database',
                data: data
            }
            redis_client.del(show.id.toString());
            return res.status(200).json(response);
        }
    });
});

app.delete("/shows/delete/:id", function(req, res) {
    Show.findByIdAndDelete(req.params.id, function(err, response) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        else {
            if (response === null) {
                var response = {
                    status: 'success',
                    message: 'Not present in the database'
                }
                return res.status(200).json(response);
            }
            var responseData = {
                status: 'success',
                message: 'Show deleted in the Database'
            }
            redis_client.del(response._id.toString());
            return res.status(200).json(responseData); 
        }
    });
});

app.post("/shows/submit", function (req, res) {
    var jobId = Math.floor(Math.random() * 1000000000);
    console.log(jobId);
    var re = async function() {
        setTimeout(async function() {
            await Article.create({
                title: req.body.title,
                content: req.body.content,
                jobId: jobId
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                });
            console.log("Async methods"); 
        }, 20000);
    };
    re();
    var response = {
        status: 'success',
        message: 'The job is started. Query the jobId for the status',
        jobId: jobId
    }
    return res.status(200).json(response);
});

app.get("/shows/results/:jobId", async function (req, res) {
    await Article.find({jobId: req.params.jobId})
        .then(function(response) {
            console.log(response);
            if (response.length === 0) {
                var responseData = {
                    status: 'success',
                    message: 'The job is now pending ',
                    jobId: req.params.jobId
                }
                return res.status(200).json(responseData);
            }
            else {
                var responseData = {
                    status: 'success',
                    message: 'The job is finished ',
                    jobId: req.params.jobId,
                    data: {
                        title: response[0].title,
                        content: response[0].content
                    }
                }
                return res.status(200).json(responseData);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});


var port = process.env.PORT || 8090;

app.listen(8000, process.env.IP, function (req, res) {
    console.log("The Backend Service has started!");
});