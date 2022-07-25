const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('ul');
const li = document.querySelectorAll('li');
const keyrow = document.querySelectorAll('keyrow');
const button = document.getElementsByTagName('button');
const start = document.querySelector(".btn__reset");
const startScreen = document.getElementById('overlay');
let letters = document.getElementsByClassName('letter');
let shows = document.getElementsByClassName('show');
let missed = 0;

//Hide's the start screen
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

//Function to check if the letter clicked on the on screen keyboard in in the phrase
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


//Event listener to add the chosen class to the buttons on screen 
//and change the hearts to lost hearts if the wrong letter is chosen
qwerty.addEventListener('click', (e) => {
    let btn = e.target;
    if (e.target.tagName === 'BUTTON' && e.target.className != "chosen") {
        btn.classList.add("chosen")
        btn.disabled = true;
    }
    const letterFound = checkLetter(btn);

    if(letterFound === null && e.target.tagName === 'BUTTON') {
        const tries = document.querySelectorAll("img");
		tries[missed].setAttribute("src", "images/lostHeart.png");
		missed++;
    }
    checkWin();
});

function resetGame() {
    start.addEventListener('click', () => {
        startScreen.classList.remove('win');
        startScreen.classList.remove('lose');
        for (i = 0; i < button.length; i++) {
            if (button[i].className === 'chosen') {
                button[i].classList.remove('chosen');
                button[i].disabled = false;
            }
        }
        phrase.innerHTML = '';
        let newPhrase = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(newPhrase);
        const hearts = document.getElementsByTagName('img');
        for (i=0; i < hearts.length; i++) {
            if (hearts[i].src = "images/lostHeart.png") {
                hearts[i].src = "images/liveHeart.png"
            }
        }
        missed = 0;
    });
}

//Function that checks for a win
function checkWin() {
    if (letters.length === shows.length) {
        //Added Timeout function because I thought the overlay change was jarring
        setTimeout(() => {
            startScreen.className = "win",
            startScreen.children[0].textContent = "You Win!",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500)
          
    } else if (missed >= 5) {
        setTimeout(() => {
            startScreen.className = "lose",
            startScreen.children[0].textContent = "Try Again",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500);
    }
resetGame();  
}