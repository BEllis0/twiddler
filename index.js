$(document).ready(function(){
    console.log('asdfasdf')

    //target the main section, friendslist on the sidebar, and hashtag list
    let $mainView = $('.mainView');
    let $sidebarFriendsList = $('#sidebarFriendsList');
    let $hashtagList = $('.hashtagList');

    //current # of tweets; used to compare if there are more tweets ready
    let currentTweetLength = streams.home.length;

    //stores all hashtags
    let hashtags = [];

    //option to tweet is hidden in initial state
    $('.tweetFormSection').hide();

    //break the date into standard format
    const getDate = (dateObj) => {
      let minutes = String(dateObj.getMinutes());
      let hour = dateObj.getHours();
      let day = String(dateObj.getDate());
      let month = dateObj.getMonth() + 1;
      let year = dateObj.getFullYear();
      
      return `${month.length === 2 ? month : `0${month}`}/${day}/${year} at ${hour}:${minutes.length === 2 ? minutes : `0${minutes}`}`;
    };

    // on page load, display timeline
    for (let i = 0; i < streams.home.length; i++) {
      
      let date = getDate(streams.home[i]['created_at']);

      // add all items to tweet
      let $tweet = $('<div class="tweet"></div>');
      $tweet.append(`<p class="tweetAuthor friend" id="${streams.home[i]['user']}">${streams.home[i]['user']}</p>`);
      $tweet.append(`<p class="tweetMessage">${streams.home[i]['message']}</p>`);
      $tweet.append(`<p class="tweetDate">${date}</p>`);
      $tweet.appendTo($mainView);

      //find hashtags in messages and save in global array; only on page load
      if (streams.home[i].message.includes('#')) {
        console.log(streams.home[i].message)
        hashtags.push(streams.home[i].message.split(' ').filter(v=> v.startsWith('#')));
      }
    };

    //display hashtag list; only on page load
    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        let $hashtagItems = $('<div class="hashtagItems"></div>');
        $hashtagItems.append(`<p class="hashtag">${hashtags[i]}</p>`);
        $hashtagItems.appendTo($hashtagList);
      }
    }

    // display friends list in sidebar (at all times)
    (() => {
      for (user in streams.users) {
        let $friendsList = $('<div class=""></div>');
        $friendsList.append(`<p class="friend" id="${user}">${user}</p>`);
        $friendsList.appendTo($sidebarFriendsList);
      }
    })()

    // on home button/logo click, return to timeline view
    function homeTweets (e) {
      $('.mainView').html('');
      $('.pageTitle').text('Home');

      for (let i = 0; i < streams.home.length; i++) {

        let date = getDate(streams.home[i]['created_at']);

        let $tweet = $('<div class="tweet"></div>');
        $tweet.append(`<p class="tweetAuthor friend" id="${streams.home[i]['user']}">${streams.home[i]['user']}</p>`);
        $tweet.append(`<p class="tweetMessage">${streams.home[i]['message']}</p>`);
        $tweet.append(`<p class="tweetDate">${date}</p>`);
        $tweet.appendTo($mainView);
      }
      e.preventDefault();
    };

    // displays specific user's data in main view
    function userTweets(e) {
      $('.mainView').html('');
      $('.pageTitle').text(`@${e.target.id}`);

      let username = $(e.target).text()
      let userItems = streams.users[username];

      for (let i = 0; i < userItems.length; i++) {

        let date = getDate(streams.home[i]['created_at']);

        // add all items to tweet
        let $tweet = $('<div class="tweet"></div>');
        $tweet.append(`<p class="tweetAuthor friend" id="${userItems[i]['user']}">${userItems[i]['user']}</p>`);
        $tweet.append(`<p class="tweetMessage">${userItems[i]['message']}</p>`);
        $tweet.append(`<p class="tweetDate">${date}</p>`);
        $tweet.appendTo($mainView);
        
      };
      e.preventDefault();
    };

    // displays friends in a list in main view
    function displayFriends(e) {
      $('.mainView').html('');
      $('.pageTitle').text('Friends');

      for (user in streams.users) {
      let $friendsList = $('<div class="friendsList"></div>');
      $friendsList.append(`<p class="friend" id="${user}">${user}</p>`);
      $friendsList.appendTo($mainView);
      };

      e.preventDefault();
    };

    function displayTweetForm(e) {

      
      //show the form element
      $('.tweetFormSection').show();
      e.preventDefault();
      
    };

    function submitTweet(e) {

      e.preventDefault();
      let tweet = $('#tweetInput').val();
      console.log(typeof tweet)
      writeTweet(tweet);

      //return to initial states
      $('.tweetFormSection').hide();
      $('#tweetInput').val('');
    };


    setInterval(function() {

      if (streams.home.length !== currentTweetLength) {
        $('.moreTweetsButton').show();
        currentTweetLength = streams.home.length;
      }
      else if (streams.home.length === currentTweetLength) {
        $('.moreTweetsButton').hide();
      }
    }, 5000);

    //on more tweets button click, go to home feed and display more tweets
    $('.moreTweetsButton').on('click', homeTweets);

    //click takes you to user's timeline
    $(document).on('click', '.friend', userTweets);

    //home button or logo click takes you to home timeline
    $('.homeButton, #logo').on('click', homeTweets);

    //friends button takes you to friends list
    $('.friendsButton').on('click', displayFriends);

    //clicking tweet button opens the tweet form
    $('.tweetButton').on('click', displayTweetForm);

    //submit tweet to queue
    $('.tweetForm').on('submit', submitTweet);

    //coming soon - ability to tweet, and ability to change view settings
    $('#settingsButton').on('click', () => { alert('Feature coming soon!') });
});