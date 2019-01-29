'use strict';


const store = (function() {

  const addBookmark = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };


  return {
    lists: [],
    addBookmark,
    adding: false,
    expanded: false,
    error: false,
    minRating: false,
    findById, 
    findAndUpdate,
    findAndDelete,
  };

}());