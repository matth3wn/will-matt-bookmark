'use strict';

/* global store, api, $ */


const bookmark = (function () {

  // generating html for bookmarks in store
  function generateBookmark(obj) {
    console.log(obj);
    if (obj.rating)
      return `
    <li class="js-item-elem" data-id="${obj.id}">
    <div aria-label="bookmark-title"data-id ="${obj.id}" class='bookmark-title'>${obj.title}</div>
    ${expandedHelper(obj)}
    <div class='star-row'>${starMaker(obj)}</div>
    <button aria-label="delete" class='delete-button' data-id="${obj.id}">Delete</button>
    </li>
    `;
    else
      return `
      <li class="js-item-elem" data-id="${obj.id}">
    <div aria-label="bookmark-title" data-id ="${obj.id}" class='bookmark-title'>${obj.title}</div>
    ${expandedHelper(obj)}<br>
    <button aria-label="delete" class='delete-button' data-id="${obj.id}">Delete</button>
    </li>
      `;
  }

  function generateBookMarkList(bookmarks) {
    const input = bookmarks.map(i => generateBookmark(i));
    return input.join('');
  }

  function getItemIdFromElement(item) {
    return $(item)
      .data('id');
  }

  function generateError(message) {
    return `
      <section class='error-section'>
     <button aria-label="close" id="cancel-error">X</button>
      <p class='error-message-p'>${message}</p>
      </section>
      `;

  }


  function handleErrorExit() {
    $('.error-container').on('click', 'button', function (event) {
      store.error = null;
      render();
    });
  }

  function addHelper(obj) {
    if (obj.adding) {
      return `
      <form banner='form' id='add-bookmark-form' class="">
      <div class="input-section" aria-label="create-bookmark">
        <label for="title">Title</label><br>
        <input type="text" id="title" placeholder="  title" name='title' ><br>
        <label for="url">URL</label><br>
        <input type="url" id="url" placeholder="  url" name='url' ><br>
        <label for="description">Description</label><br>
        <input type="text" id="description" placeholder="  description" name='desc' ><br>
        <label for="rating">Rating</label><br>
        <input type="number" id="rating" placeholder=" 1-5" name='rating'  min="1" max="5" ><br>
        <button class="submit-button" type="submit">Submit</button>
        </div>
  </form>
  
      `;
    } else {
      return `<button id="add-bookmark">Add Bookmark</button>
      `;
    }
  }

  function expandedHelper(bookmark) {
    if (bookmark.expanded) {
      return `<div class="">${bookmark.desc}</div>
      <div class=""><a href="${bookmark.url}" target="_blank">Visit ${bookmark.title}!</a></div> `;
    } else
      return '';
  }

  function starMaker(obj) {
    let star = '';
    for(let i = 0; i < obj.rating; i++){
      star+='★';
    }
    return `<span class=star>${star}</span>`;
  }
  // handles expanding the bookmarks
  function handleExpand() {
    $('.bookmark-list').on('click', 'div', function (event) {
      const id = getItemIdFromElement(event.currentTarget);

      store.lists.map(bookmark => {
        if (bookmark.id === id) {
          bookmark.expanded = !bookmark.expanded;
        }
        render();
      });
    });
  }

  function handleDelete() {
    $('.bookmark-list').on('click', 'button', function (event) {
      const id = getItemIdFromElement(event.currentTarget);

      api.deleteBookmark(id)
        .then((bookmark1) => {
          store.findAndDelete(id, bookmark1);
          render();
        })
        .catch(err => {

          store.setError(err.message);
          render();
        });
    });
  }
  // handle drop down filter

  function handleDropDown() {
    $('.dropdown-filter').on('change', function (event) {
      const rate = $(':selected').val();
      store.minRating = rate;
      render();
    });
  }


  // handling adding bookmark
  function handleAddBookmark() {
    $('.button-section').on('submit', 'form', function (event) {
      event.preventDefault();
      const newBookmark = $(event.target).serializeJson();
      console.log(newBookmark);

      api.createBookmark(newBookmark)
        .then(newBookmark1 => {
          store.addBookmark(newBookmark1);
          store.adding = false;
          render();
        })
        .catch(err => {
          store.setError(err.message);
          render();
        });

    });
  }

  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => {
        if (name === 'rating' && val === '') {
          return;
        }
        o[name] = val;
      });
      return JSON.stringify(o);
    }
  });

  //sets store.adding = true
  function addButton() {
    $('.button-section').on('click', '#add-bookmark', function (event) {
      store.adding = true;
      render();
    });
  }

  function render() {
    let bookmarks2 = [...store.lists];

    if (store.minRating) {
      bookmarks2 = bookmarks2.filter(i => i.rating >= store.minRating);
    }
    const bookmarkString = generateBookMarkList(bookmarks2);
    const form = addHelper(store);

    if (store.error) {
      const errorMessage = generateError(store.error);

      $('.error-container').html(errorMessage);
    } else {
      $('.error-container').empty();
    }


    $('.button-section').html(form);
    $('.bookmark-list').html(bookmarkString);
  }


  function eventListener() {
    handleAddBookmark();
    addButton();
    handleExpand();
    handleDelete();
    handleErrorExit();
    handleDropDown();
  }


  return {
    eventListener,
    render
  };


}());