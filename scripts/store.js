'use strict';

const STORE = (function() {
  const setError = function(error) {
    this.error = error;
  };

  function findById(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  function addApiData(data) {
    if (this.findById(data.id) === undefined) {
      data.expanded = false;
      this.bookmarks.push(data);
    }
    Object.assign(this.findById(data.id), data);

    return STORE.bookmarks;
  }

  function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  }

  return {
    bookmarks: [],
    ratingFilter: 0,
    error: false,
    addApiData,
    findById,
    findAndDelete,
    setError
  };
})();
