'use strict';
/* global $ */

const BOOKMARKLIST = (function() {
  $.fn.extend({
    serializeJson: function() {
      const obj = {};
      const formData = new FormData(this[0]);
      formData.forEach((val, key) => {
        obj[key] = val;
      });

      return JSON.stringify(obj);
    }
  });

  function createElement(data) {
    if (data.expanded) {
      //add data to template
      //return template
      return `<li class="js-bookmark-li" data-item-id=${data.id}>
      <div class="js-list-wrapper">
        <span class="js-list-title">Title: ${data.title}</span>
        <div class="js-rating">
          <span class="js-list-rating">Rating: ${data.rating}</span>
          <button class="js-list-toggle">&#9776</button>
          <button class="js-list-delete">Delete</button>

        </div>
        <div class="js-rating">
          <span class="js-list-description">Description ${data.desc}</span>
          <a target="_blank" href=${
            data.url
          }  class="js-visit-site">Visit Site</a>
        </div>
      </div>
    </li>`;
    }
    return `<li class="js-bookmark-li" data-item-id=${data.id}>
              <div class="js-list-wrapper">
                <span class="js-list-title">Title: ${data.title}</span>
                <div class="js-rating">
                  <span class="js-list-rating">Rating: ${data.rating}</span>
                  <button class="js-list-toggle">&#9776</button>
                  <button class="js-list-delete">Delete</button>
                </div>
              </div>
            </li>`;
  }

  function generateError(message) {
    return `
      <span class="js-error-message">${message}</span><span class="js-error-close">&#9746</span>
    `;
  }

  function render() {
    let localCopy = [];
    if (STORE.ratingFilter > 0) {
      localCopy = STORE.bookmarks.filter(items => {
        return items.rating >= STORE.ratingFilter;
      });
    } else {
      localCopy = [...STORE.bookmarks];
    }
    //create elements from store data.
    let bookmarkList = localCopy.map(element => {
      return createElement(element);
    });
    bookmarkList.join('');

    //render elements to page
    $('.js-bookmark-list').html(bookmarkList);
  }

  /*   ***********************USER STORY ******************   DONE */
  // I receive appropriate feedback when I cannot submit a bookmark
  // Check all validations in the API documentation (e.g. title and url field required)
  function renderError() {
    if (STORE.error) {
      const el = generateError(STORE.error);
      $('.js-error-message-display').html(el);
    } else {
      $('.js-error-message-display').empty();
    }
  }

  /*   ******************USER STORY**********************     DONE*/
  // As a user: I can add bookmarks to my bookmark list. Bookmarks contain:
  // title
  // url link
  // description
  // rating (1-5)

  function addBookmarkHandler() {
    $('.js-bookmark-form').on('submit', function(event) {
      event.preventDefault();
      //get data from form and create object from data
      const data = $(event.target).serializeJson();
      //push data to api
      API.addBookmarks(data)
        .then(data => {
          //add data to store
          STORE.addApiData(data);
          //render page.
          render();
        })
        .catch(err => {
          console.log(err);
          STORE.setError(err.message);
          renderError();
        });
    });
  }

  /*   ***********************USER STORY ******************   DONE*/

  // I can see a list of my bookmarks when I first open the app

  /*   ***********************USER STORY ******************   */
  // All bookmarks in the list default to a "condensed" view showing only title and rating
  // I can click on a bookmark to display the "detailed" view
  // Detailed view expands to additionally display description and a "Visit Site" link

  function detailedViewHandler() {
    $('.js-bookmark-list').on('click', '.js-list-toggle', function(event) {
      const id = getItemIdFromElement(event.currentTarget);
      const item = STORE.findById(id);
      item.expanded = !item.expanded;
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .data('item-id');
  }
  /*   ***********************USER STORY ******************   DONE*/
  // I can remove bookmarks from my bookmark list
  function deleteBookmarkHandler() {
    $('.js-bookmark-list').on('click', '.js-list-delete', function(event) {
      const id = getItemIdFromElement(event.currentTarget);
      API.removeBookmarks(id)
        .then(() => {
          STORE.findAndDelete(id);
          render();
        })
        .catch(err => {
          console.log(err);
          STORE.setError(err.message);
          renderError();
        });
    });
  }

  /*   ***********************USER STORY ******************   DONE*/
  // I can select from a dropdown a "minimum rating" to filter the list by all bookmarks
  // rated at or above the chosen selection
  function ratingsfilterHandler() {
    $('.js-dropdown-rating-menu').on('change', function(event) {
      const selected = $(event.target)
        .children('option:selected')
        .val();
      STORE.ratingFilter = selected;
      render();
    });
  }

  function errorMessageDeleteHandler() {
    $('.js-error-message-display').on('click', '.js-error-close', function(
      event
    ) {
      console.log('we ate here');
      STORE.error = false;
      renderError();
      render();
    });
  }

  function bindEventListeners() {
    addBookmarkHandler();
    deleteBookmarkHandler();
    detailedViewHandler();
    ratingsfilterHandler();
    errorMessageDeleteHandler();
  }
  return {
    bindEventListeners,
    render
  };
})();
