var PROMOTED_LITTERALS = new Set([
  "Promoted",
  "Sponsorisé",
  "Promocionado",
  "Patrocinat",
  "Sponsorizzato",
  "Promovido",
  "Gesponsert",
  "Uitgelicht",
  "Promoveret",
  "Promotert",
  "Promowane",
  "Sponzorira",
  "Ajánlott",
]);

var RemovePromotedTweets = RemovePromotedTweets || {

  init: function () {
    var observer;        // Observer that will fire whenever new tweets are appended
    var run = this.run;  // Bring this.run() into scope so we can run it in the observer

    // Run the remover once when the page is loaded
    run();

    root = document.getElementById('react-root');

    // If we get the root that we expected, then we can install the
    // observer and re-run the callback whenever new tweets are loaded.
    if (root) {
      observer = new MutationObserver(function (mutations) {
        run();
      });
      observer.observe(root, { childList: true, subtree: true });
    }
  },

  run: function () {
    var tweetsToRemove = [];

    Array.from(document.getElementsByTagName('article')).forEach(function (tweet) {

      Array.from(tweet.getElementsByTagName('div')).forEach(function (div) {

        if (PROMOTED_LITTERALS.has(div.textContent)) {
          // console.log('Sponsored tweet found !');
          tweetsToRemove.push(tweet);
        }

      });
    });

    // Loop through promoted tweets and remove them
    tweetsToRemove.forEach(function (t) {
      if (t.parentNode) {
        t.parentNode.removeChild(t);
      }
    });
  }
}

// Off to the races...

RemovePromotedTweets.init();
