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
    if (e.target.tagName === 'BUTTON' && e.target.tagName != "chosen") {
        btn.classList.add("chosen")
    }
    const letterFound = checkLetter(btn);

    if(letterFound === null && e.target.tagName === 'BUTTON') {
        const tries = document.querySelectorAll("img");
		tries[missed].setAttribute("src", "images/lostHeart.png");
		missed++;
    }
    checkWin();
});

//Function that checks for a win
let letters = document.getElementsByClassName('letter');
let shows = document.getElementsByClassName('show');

function checkWin() {
    if (letters.length === shows.length) {
        //Added Timeout function because I thought the overlay change was jarring
        setTimeout(() => {
            startScreen.className = "win",
            startScreen.children[0].textContent = "You Win!",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500)
        //Changes the start button in the win/lose screen to a reset button 
        //that refreshes the page
        start.addEventListener('click', () => {
            window.location.reload();
        });

    } else if (missed >= 5) {
        setTimeout(() => {
            startScreen.className = "lose",
            startScreen.children[0].textContent = "Try Again",
            start.textContent = "Reset",
            startScreen.style.display = "flex"
          }, 500)

        start.addEventListener('click', () => {
            window.location.reload();
        });
    }

   
}

