// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
//const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
//const addFriendButton = document.getElementById('add-friend-button');
const formEl = document.querySelector('form');

// initialize state
let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    // get the name from the input
    const data = new FormData(formEl);
    
    // create a new friend object
    const newFriendObject = {
        name: data.get('friend-name'),
        satisfaction: Math.floor(Math.random()) * 2,
    };

    // push it into the friends state array, passed in as an argument
    friendData.push(newFriendObject);

    // reset the input
    formEl.reset();

    // display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';   

    // for each friend in state . . .
    for (let friend of friendData) {

        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);

        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //         and if the friend's satisfaction level is below 3 and you have mushrooms left
        //             increment the friends satisfaction and decrement your mushrooms
        //             then display your friends and mushrooms with the updated state
        friendEl.addEventListener('click', () => {
            const friendInState = findFriendByName(friend.name, friendData);
            
            if (mushroomCount === 0) {
                alert('no mushrooms left! go forage for some more');
            }
            if (friendInState.satisfaction < 3 && mushroomCount > 0){
                friendInState.satisfaction++;
                mushroomCount--; 
            }
            displayFriends();
            displayMushrooms();
        });    

        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function findFriendByName(name, friends) {

    for (let friend of friends) {
        if (friend.name === name) {
            return friend;
        }
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';

    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomDisplayEl = renderMushroom();
        mushroomsEl.append(mushroomDisplayEl);
    }
}

displayFriends();
displayMushrooms();
