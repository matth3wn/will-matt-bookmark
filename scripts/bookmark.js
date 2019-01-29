'use strict';

/* global store, api, $ */


const bookmark = (function() {


  // handling adding bookmark
  function handleAddBookmark() {
    $('#add-bookmark-form').submit(function(event) {
      event.preventDefault();
      $(event.target).serializeJson();
      console.log($(event.target).serializeJson());
    });
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      console.log(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  

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
