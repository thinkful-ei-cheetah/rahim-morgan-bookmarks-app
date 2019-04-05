'use strict';
/* global $ */

const STORE = (function() {

  render() {
    this.store.html(store);
  }
  function addApiData() {

    console.log('STORE.addItem function work');
    return this.bookmarks;
  }
  return {
    bookmarks: [],
    ratingfilter: false,
    addApiData
  };
})();
