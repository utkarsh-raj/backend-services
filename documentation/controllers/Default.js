'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.articlesResultsIdGET = function articlesResultsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.articlesResultsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.articlesSubmitPOST = function articlesSubmitPOST (req, res, next) {
  var title = req.swagger.params['title'].value;
  Default.articlesSubmitPOST(title)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showsDeleteIdDELETE = function showsDeleteIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.showsDeleteIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showsGetGET = function showsGetGET (req, res, next) {
  Default.showsGetGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showsGetIdGET = function showsGetIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Default.showsGetIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showsPostPOST = function showsPostPOST (req, res, next) {
  var show = req.swagger.params['show'].value;
  Default.showsPostPOST(show)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.showsUpdateIdPUT = function showsUpdateIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var show = req.swagger.params['show'].value;
  Default.showsUpdateIdPUT(id,show)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
