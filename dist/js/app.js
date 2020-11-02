"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPageTitle = setPageTitle;

var _ajax = require("./services/ajax.js");

function setPageTitle() {
  //set Title en HTML
  var source = document.getElementById('heading').innerHTML;
  var mainTemplate = Handlebars.compile(source);
  var context = {
    title: 'News Application'
  };
  document.getElementById('heading').innerHTML = mainTemplate(context);
}

function getheadlines() {
  var apiKey = localStorage.getItem('apiKey');
  var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey;

  _ajax.ajax.get(url).then(function (data) {
    var source = document.getElementById('news-container').innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      headline: data.articles
    };
    document.getElementById('news-container').innerHTML = template(context);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  setPageTitle();
  getheadlines();
});