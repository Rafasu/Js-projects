// Variables
const tweets = document.getElementById('list-tweets');

// Functions
const createDeleteButton = () => {
    const deleteButton = document.createElement('a');
    deleteButton.textContent = 'X';
    deleteButton.classList = 'delete-tweet';
    
    return deleteButton
}

const createTweet = (content) => {
    const li = document.createElement('li');
    li.textContent = content;
    return li;
}

const cleanTextArea = () => {
    document.getElementById('tweet').value = '';
}

const addTweet = (e) =>{
    e.preventDefault();
    const tweetContent = document.getElementById('tweet').value;
    const deleteButton = createDeleteButton();
    const tweet = createTweet(tweetContent);
   
    tweet.appendChild(deleteButton);
    tweets.appendChild(tweet);
    //LocalStorage
    addTweetLocalStorage(tweetContent);
    cleanTextArea();
}

const deleteTweet = (e) => {
    e.preventDefault();
    
    if(e.target.className === 'delete-tweet'){
        e.target.parentElement.remove();
        deleteTweetLocalStorage(e.target.parentElement.textContent);
    }
}

const addTweetLocalStorage = (tweet) => {
    let tweetArray;
    tweetArray = getTweetsLocalStorage();
    tweetArray.push(tweet);
    
    localStorage.setItem('tweets', JSON.stringify(tweetArray));  
}

const deleteTweetLocalStorage = (tweet) => {
    let tweetArray = getTweetsLocalStorage();
    const tweetToDelete = tweet.substr(0, tweet.length - 1);
    
    tweetArray.forEach((tweetItem, index)=>{
        if(tweetToDelete === tweetItem){
            tweetArray.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweetArray));
}

const getTweetsLocalStorage = () => {
    let tweetArray ;
    if(localStorage.getItem('tweets') === null){
        tweetArray= [];
    }else{
        tweetArray = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweetArray;
}

const storedTweets = () => {
    let tweetArray = getTweetsLocalStorage();
    
    tweetArray.forEach((tweetContent)=>{
        const deleteButton = createDeleteButton();
        const tweet = createTweet(tweetContent);
   
        tweet.appendChild(deleteButton);
        tweets.appendChild(tweet);
    });
}


// Listeners 
const eventListeners = () =>{
    document.getElementById('tweetform').addEventListener('submit', addTweet);
    
    tweets.addEventListener('click', deleteTweet);
    
    //Load Stored Tweets
    document.addEventListener('DOMContentLoaded', storedTweets);
}

eventListeners();

