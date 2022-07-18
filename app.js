const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

//Hide's the start screen
const start = document.querySelector(".btn__reset");
const startScreen = document.getElementById('overlay');

start.addEventListener('click', () => {
    startScreen.style.display = "none";
});


const phrases = [
    'ice cream',
    'pudding',
    'cake',
    'truffle',
    'cinnamon roll'
];

//Gets a random phrase from the phrases array
function getRandomPhraseAsArray(arr) {
    const random = arr[Math.floor(Math.random() * arr.length)];
    return random.split("");
};

//Assigns the phrases array item to a variable
let randomPhrase = getRandomPhraseAsArray(phrases);

//Adds array item to display
function addPhraseToDisplay(arr) {
    const ul = document.querySelector("#phrase");

    for (i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);

        if (arr[i] === " "){
            li.classList.add("space");
        } else{
            li.classList.add("letter");
        }

    }

};

addPhraseToDisplay(randomPhrase);

function checkLetter(btn) {
    let letter = document.querySelectorAll('li');
    let match = null;
    for (i=0; i < letter.length; i++) {
        if (btn.textContent === letter[i].textContent) {
            letter[i].classList.add("show");
            match = btn.textContent;
        } 
    }

    return match;
};

qwerty.addEventListener('click', (e) => {
    let btn = e.target;
    if (e.target.tagName === 'BUTTON' && e.target.tagName != "chosen") {
        btn.classList.add("chosen")
    }
    const letterFound = checkLetter(btn);

    if(letterFound === null ) {
        const tries = document.querySelectorAll('.tries');
        const triesArray = Array.from(tries);
        for (i = 0; i < triesArray.length; i++) {
            triesArray[i].style.display = 'none';
        }
    }
});


