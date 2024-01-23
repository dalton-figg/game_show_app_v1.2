// step two - declaring variables

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

// if the player guesses wrong 5 times, they lose the game

let missed = 0;

// step 3 - add an event listener to the 'start game' button

const overlay = document.getElementById('overlay');

// listen for clicks

overlay.addEventListener('click', (e) => {
  // ensure the button is being clicked (using the bubbling principle)
  if (e.target.className === 'btn__reset') {
    // hide the overlay
    overlay.style.display = 'none';
    // start game
    resetGame();
  }
});

// step 4 - create a phrases array with at least 5 phrases

const phrases = [
  'lorem ipsum',
  'sit dolor',
  'amet consectur',
  'ipsum dolor',
  'amet sit dolor',
];

// step 5 - create a getRandomPhraseAsArray function

const getRandomPhraseAsArray = (arr) => {
  // get a random number in the array
  let index = Math.floor(Math.random() * arr.length);

  // return the phrase as an array
  return arr[index].split('');
};

// step 6 - set the game display

let phraseList = document.getElementById('phrase');

const addPhraseToDisplay = (arr) => {
  // loops through every character in a phrase array

  arr.forEach((char) => {
    // create the element

    let listItem = document.createElement('li');

    // if it is a letter (not a space) then add the class letter

    if (char !== ' ') listItem.className = 'letter';

    // remember to actually add the text content of character

    listItem.innerText = char;

    // append to parent ul

    phraseList.appendChild(listItem);
  });
};

// step 7 - check letter function

const checkLetter = (button) => {
  // get all the elements with a class of letter
  const letters = document.getElementsByClassName('letter');

  let foundLetter;

  // loop over the letters and check for a match

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].innerText.toLowerCase() === button) {
      letters[i].classList.add('show');
      foundLetter = letters[i];
    }
  }
  return foundLetter;
};

// step 8 - add event listener to keyboard

let hearts = document.querySelectorAll('.tries img');

keyboard.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && !e.target.disabled) {
    e.target.classList.add('chosen');
    e.target.disabled = true;

    const letterFound = checkLetter(e.target.innerHTML);

    // step 9 - count the game misses

    if (!letterFound) {
      missed++;
      hearts[missed - 1].src = 'images/lostHeart.png';
    }
  }

  checkWin();
});

// step 10 - checkwin function

const overlayTitle = document.querySelector('.title');

const overlayButton = document.querySelector('.btn__reset');

const checkWin = () => {
  const letters = document.getElementsByClassName('letter');
  const shownLetters = document.getElementsByClassName('show');

  if (shownLetters.length === letters.length) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
    overlayTitle.innerHTML = 'You win!';
    overlayButton.innerHTML = 'Play again!';
  } else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    overlayTitle.innerHTML = 'You lost!';
    overlayButton.innerHTML = 'Try again!';
  }
};

// exceeds - start game function

const buttons = document.querySelectorAll('button');

const resetGame = () => {
  // reset the displayed word
  phrase.innerHTML = '';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  
  // reset keyboard
  buttons.forEach((button) => {
    if ((button.className = 'chosen')) {
      button.className = '';
      button.disabled = false;
    }
  });

  // reset hearts
  missed = 0;
  hearts.forEach((heart) => (heart.src = 'images/liveHeart.png'));
};
