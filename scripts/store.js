'use strict';
/* global $ */

const STORE = (function() {
  function findById(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  function addApiData(data) {
    console.log(data.id);
    if (this.findById(data.id) === undefined) {
      data.expanded = false;
      this.bookmarks.push(data);
    }
    Object.assign(this.findById(data.id), data);
    console.log('STORE.addApiData function work', this.bookmarks);

    return STORE.bookmarks;
  }

  return {
    bookmarks: [],
    ratingfilter: false,
    error: false,
    addApiData,
    findById
  };
})();
