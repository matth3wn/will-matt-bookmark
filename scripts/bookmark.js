'use strict';

/* global store, api, $ */


const bookmark = (function() {

  // handling adding bookmark
  function handleAddBookmark() {
    $('#add-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newBookmark = $('#title').val();
      console.log(newBookmark);
      const newUrl = $('#url').val();
      console.log(newUrl);
      const newDescript = $('#description').val();
      console.log(newDescript);
      const newRating = $('#rating').val();
      console.log(newRating);
    });
  }

  function addButton() {
    $('#add-bookmark').on('click', function(event) {
      console.log('add button ran');
      store.adding = true;
      render();
    });
  }

  function render() {

  }


  function eventListener() {
    handleAddBookmark();
    addButton();
  }


  return {
    eventListener, render
  };


}());
