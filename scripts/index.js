'use strict';
/* global $ */

$(
  BOOKMARKLIST.bindEventListeners(),
  API.getBookmarks().then(() => BOOKMARKLIST.render())
);
