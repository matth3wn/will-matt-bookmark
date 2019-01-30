'use strict';


const store = (function() {

  const addBookmark = function(item) {
    this.lists.push(item);
  };

  const findById = function(id) {
    return this.lists.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findAndDelete = function(id) {
    this.lists = this.lists.filter(item => item.id !== id);
  };
  const setError = function(error) {
    this.error = error;
  };

  const emptyArray = function(){
    this.lists = [];
  };

  return {
    lists: [],
    addBookmark,
    adding: null,
    expanded: null,
    error: false,
    minRating: false,
    findById, 
    findAndUpdate,
    findAndDelete,
    setError,
    emptyArray
  };

}());