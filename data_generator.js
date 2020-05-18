/*
 * NOTE: This file generates fake tweet data.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.visitor = [];
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
const addTweet = newTweet => {
  let username = newTweet.user;
  streams.users[username].unshift(newTweet);
  streams.home.unshift(newTweet);
};

// utility function
const randomElement = array => {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
let opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
let verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
let objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
let nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
let tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

const randomMessage = () => {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
const generateRandomTweet = () => {
  let tweet = {};
  
  // filter out visitor, so as to only be used for user input
  let filterVisitor = users.filter(item => item !== 'visitor')
  
  tweet.user = randomElement(filterVisitor);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

// start with 10 tweets
for (var i = 0; i < 10; i++){
  generateRandomTweet();
}

// func to generate and queue a tweet
const scheduleNextTweet = () => {
  generateRandomTweet();
  // use setTimeout to push tweets
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
// run schedule func
scheduleNextTweet();

// write tweets
const writeTweet = message => {
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  let tweet = {};
  tweet.user = 'visitor';
  tweet.message = message;
  tweet.created_at = new Date();
  addTweet(tweet); // add tweet to queue
};