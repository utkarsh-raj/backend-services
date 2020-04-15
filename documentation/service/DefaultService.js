'use strict';


/**
 * An async endpoint to see the status of a submitted job (creation of the article).
 *
 * id String The id of the article to be seen 
 * returns inline_response_200_6
 **/
exports.articlesResultsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "jobId" : 1.25784683E8,
  "data" : {
    "title" : "Review of The Witcher",
    "content" : "lorem ipsum dolor sit amet"
  },
  "message" : "The job is finished",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * An async endpoint to submit a new article.
 *
 * title Title The article to create (optional)
 * returns inline_response_200_5
 **/
exports.articlesSubmitPOST = function(title) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "jobId" : 1.25438783E8,
  "message" : "The job is started. Query the jobId for the status",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes the show.
 *
 * id String The id of the show to be deleted 
 * returns inline_response_200_4
 **/
exports.showsDeleteIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Show deleted in the Database",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the list of all the shows
 *
 * returns inline_response_200
 **/
exports.showsGetGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "Breaking Bad"
  }, {
    "name" : "The Witcher"
  } ],
  "message" : "All shows retrieved from the database",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the particular show with the id
 *
 * id String The id of the show queried
 * returns inline_response_200_1
 **/
exports.showsGetIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : [ {
    "name" : "Breaking Bad",
    "id" : "5e9712ef3cd9ce1744d5a6ec"
  } ],
  "message" : "One particular show retrieved from the database",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates a new show .
 *
 * show Show The show to create. (optional)
 * returns inline_response_200_2
 **/
exports.showsPostPOST = function(show) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "name" : "Money Heist",
    "id" : "5e96cea6d96a3813dec086b2"
  },
  "message" : "Saved into the database",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates the existing shows.
 *
 * id String The id of the show to be updated 
 * show Show_1 The show to update. (optional)
 * returns inline_response_200_3
 **/
exports.showsUpdateIdPUT = function(id,show) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "name" : "Money Heist Season 2",
    "id" : "5e96cea6d96a3813dec086b2"
  },
  "message" : "Show update in the Database",
  "status" : "success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

