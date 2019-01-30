'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/matt-wills';

  const listApiFetch = function(...args) {
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = true;
        }

        return res.json();
      })
      .then(data => {
        if (error) throw new Error(data.message);
        return data;
      });
  };

  const getBookmark = function() {
    return listApiFetch(BASE_URL + '/bookmarks');
  };

  const createBookmark = function(name) {
    return listApiFetch(BASE_URL + '/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: name
    });
  };

  const updateBookmark = function(id, updateData) {
    const newData = JSON.stringify(updateData);
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newData
    });
  };

  const deleteBookmark = function(id) {
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
      method: 'DELETE'
    });
  };

  return {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };
}());