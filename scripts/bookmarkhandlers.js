'use strict';
/* global $ */

// As a user: I can add bookmarks to my bookmark list. Bookmarks contain:
// title
// url link
// description
// rating (1-5)
const BOOKMARKLIST = (function() {
  function addBookmarkHandler() {
    console.log('add bookmarkhandler works');
  }

  // I can see a list of my bookmarks when I first open the app

  // All bookmarks in the list default to a "condensed" view showing only title and rating
  // I can click on a bookmark to display the "detailed" view
  // Detailed view expands to additionally display description and a "Visit Site" link

  function detailedViewHandler() {
    console.log('detailview handler works');
  }

  // I can remove bookmarks from my bookmark list
  function deleteBookmarkHandler() {
    console.log('delete bookmark handler works');
  }
  // I receive appropriate feedback when I cannot submit a bookmark
  // Check all validations in the API documentation (e.g. title and url field required)

  // I can select from a dropdown a "minimum rating" to filter the list by all bookmarks
  // rated at or above the chosen selection
  function ratingsfilterHandler() {
    console.log('ratings filter handler works');
  }

  function bindEventListeners() {
    addBookmarkHandler();
    deleteBookmarkHandler();
    detailedViewHandler();
    ratingsfilterHandler();
  }
  return {
    bindEventListeners
  };
})();
