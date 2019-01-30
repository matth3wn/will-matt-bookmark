'use strict';
/* global  store, api,$,bookmark */

$(document).ready(function () {
  bookmark.eventListener();

  api.getBookmark()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      bookmark.render();
    })
    .catch(err => console.log(err.message));
});