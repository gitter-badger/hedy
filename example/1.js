'use strict';

var hedy = require('../src');
var memAdapter = require('../src/adapter/mem');

var log = function(thing) {
  console.log(JSON.stringify(thing, true, 2));
};

var data = {
  user: [
    { id: 1, name: 'heiner' },
    { id: 2, name: 'klaus' },
    { id: 3, name: 'manfred' }
  ],
  comment: [
    { id: 1, userId: 2, postId: 1, text: 'gorgeous' },
    { id: 2, userId: 3, postId: 2, text: 'nice' },
    { id: 4, userId: 1, postId: 2, text: 'splended' },
    { id: 5, userId: 2, postId: 1, text: 'awesome' }
  ],
  post: [
    { id: 1, userId: 3, text: 'post 1' },
    { id: 2, userId: 2, text: 'post 1' },
  ]
};

var adapter = memAdapter(data);

var store = hedy(adapter);

var userQuery = store('user');
var commentQuery = store('comment');
var postQuery = store('post');

var commentsWithPosts = commentQuery.withRelated(hedy.belongsTo(postQuery));

userQuery.withRelated(hedy.hasMany(commentsWithPosts)).then(log);
