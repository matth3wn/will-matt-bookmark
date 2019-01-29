'use strict';
/* global  store, api,$,bookmark */

$(document).ready(function() {
  bookmark.eventListener();

  // On initial load, fetch Shopping Items and render
//   api.getItems()
//     .then((items) => {
//       items.forEach((item) => store.addItem(item));
//       bookMark.render();
//     })
//     .catch(err => console.log(err.message));
});