'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/matt-will/items';

  /**
   * listApiFetch - Wrapper function for native `fetch` to standardize error handling
   * @param {string} url 
   * @param {object} options 
   */
  const listApiFetch = function(...args) {
    // setup var in scope outside of promise chain
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // if response is not 2xx, indicate error occurred
          error = true;
        }

        // return parsed JSON no matter what
        return res.json();
      })
      .then(data => {
        // if error, then throw the error message so it will land in the next catch()
        if (error) throw new Error(data.message);

        // otherwise, return the json as normal resolution
        return data;
      });
  };

  const getBookmark = function() {
    return listApiFetch(BASE_URL + '/bookmarks');
  };

  const createBookmark = function(name) {
    const newItem = JSON.stringify({ name });
    return listApiFetch(BASE_URL + '/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newItem
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