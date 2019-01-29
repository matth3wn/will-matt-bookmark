'use strict';

/* global store, api, $ */


const bookmark = (function () {

  // generating html for bookmarks in store
  function generateBookmark(obj) {

    if (store.adding === true) {
      $('#add-bookmark-form').removeClass('hidden');
      $('#add-bookmark').addClass('hidden');
    }
    if (store.adding === false) {
      $('#add-bookmark-form').addClass('hidden');
      $('#add-bookmark').removeClass('hidden');
      $('#add-bookmark-form').find('input').val('');
    }

    return `
    <li class="js-item-elem" data-id="${obj.id}">
    <div>${obj.title}</div>
    ${expandedHelper(obj)}
    <div>Rating ${obj.rating}</div>
    <button class='delete-button'>Delete</button>
    </li>
    `;
  }

  function generateBookMarkList(bookmarks) {
    const input = bookmarks.map(i => generateBookmark(i));
    return input.join('');
  }

  function getItemIdFromElement(item) {
    console.log(item);
    return $(item)
      .data('id');
  }


  function expandedHelper(bookmark) {
    if (bookmark.expanded) {
      return `<div class="">Descrip ${bookmark.desc}</div>
      <div class=""><a href="${bookmark.url}">Visit ${bookmark.title}!</a></div> `;
    } else
      return '';
  }
  // handles expanding the bookmarks
  function handleExpand() {
    $('.bookmark-list').on('click', 'li', function (event) {
      // console.log(this);
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);

      store.lists.map(bookmark => {
        if (bookmark.id === id) {
          bookmark.expanded = !bookmark.expanded;
        }
        render();
      });
    });
  }


  // handling adding bookmark
  function handleAddBookmark() {
    $('#add-bookmark-form').submit(function (event) {
      event.preventDefault();
      const newBookmark = $(event.target).serializeJson();
      console.log('handle add bookmark ran..');
      api.createBookmark(newBookmark)
        .then(newBookmark1 => {
          store.addBookmark(newBookmark1);
          store.adding = false;
          render();
        })
        .catch(err => {
          store.error = true;
          store.setError(err.message);
          render();
        });

    });
  }

  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  //sets store.adding = true
  function addButton() {
    $('#add-bookmark').on('click', function (event) {
      console.log('add button ran');
      store.adding = true;
      render();
    });
  }

  function render() {
    const bookmarks2 = [...store.lists];

    const bookmarkString = generateBookMarkList(bookmarks2);


    $('.bookmark-list').html(bookmarkString);
  }


  function eventListener() {
    handleAddBookmark();
    addButton();
    handleExpand();
  }


  return {
    eventListener,
    render
  };


}());