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
    'Boulevard of Broken Dreams',
    'Welcome to the Black Parade',
    'Dear Maria Count me in',
    'I Write Sins not Tragedies',
    'Teenage Dirtbag'
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

        if (arr[i].textContent === " "){
            li.classList.add("space");
        } else{
            li.classList.add("letter");
        }

    }

};

addPhraseToDisplay(randomPhrase);
