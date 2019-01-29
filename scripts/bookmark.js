'use strict';

/* global store, api, $ */


const bookmark = (function() {

  // generating html for bookmarks in store
  function generateBookmark(obj){
    
    if(store.adding === true){
      $('#add-bookmark-form').removeClass('hidden');
      $('#add-bookmark').addClass('hidden');
    }
    if(store.adding === false){
      $('#add-bookmark-form').addClass('hidden');
      $('#add-bookmark').removeClass('hidden');
      $('#add-bookmark-form').find('input').val('');
    }

    return `
    <li data-item-id="${obj.id}>
    <div>${obj.title}</div>
    <div class="li hidden">Descrip ${obj.desc}</div>
     <div class="li hidden"><a href="${obj.url}">Visit ${obj.title}!</a></div> 
    <div>Rating ${obj.rating}</div>
    <button class='delete-button'>Delete</button>
    </li>
    `;
  }

  function generateBookMarkList(bookmarks){
    const input = bookmarks.map(i => generateBookmark(i));
    return input.join('');
  }

  // not working at the moment
  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .find('.li')
      .data('item-id');
  }



  // handles expanding the bookmarks
  function handleExpand(){
    $('.bookmark-list').on('click', 'li',function(event){
      console.log(this);
      store.expanded = true;
      const id = getItemIdFromElement(this);
      console.log(id);
    //   $(event.target).closest('li').find('.li').toggleClass('hidden');
    });
  }


  // handling adding bookmark
  function handleAddBookmark() {
    $('#add-bookmark-form').submit(function(event) {
      event.preventDefault();
      const newBookmark = $(event.target).serializeJson();
      console.log('handle add bookmark ran..');
      api.createBookmark(newBookmark)
        .then(newBookmark1 =>{
          store.addBookmark(newBookmark1);
          store.adding = false;
          render();
        })
        .catch(err =>{
          store.error = true;
          store.setError(err.message);
          render();
        });

    });
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  
  //sets store.adding = true
  function addButton() {
    $('#add-bookmark').on('click', function(event) {
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
    eventListener, render
  };


}());
