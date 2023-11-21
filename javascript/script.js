const pictures = [
    `./images/angular.svg`,
    `./images/bootstrap.svg`,
    `./images/c.svg`,
    `./images/css.svg`,
    `./images/django.svg`,
    `./images/github.svg`,
    `./images/html.svg`,
    `./images/javascript.svg`,
    `./images/nodejs.svg`,
    `./images/php.svg`,
    `./images/python.svg`,
    `./images/react.svg`,
    `./images/redux.svg`,
    `./images/ruby.svg`,
    `./images/rust.svg`,
    `./images/sass.svg`,
    `./images/swift (1).svg`,
    `./images/typescript.svg`,
    `./images/vue-dot-js.svg`,
    `./images/typescript.svg`

]

let score;
let numberOfAttempts;
let cardID;
let maxScore;

const startGameButton = document.querySelector('.start-button');
const difficultyLevel = document.getElementById('difficulty-level');
const attempts = document.querySelector('.attempts');

const restartGameButton = document.querySelector('.restart-button');

restartGameButton.addEventListener('click', function() {
    if (!document.querySelector('.card')) {
        alert('You must start the game first')
        return;
    }
    let youSure = confirm('Your progress will be reset. Are you sure you want to restart the game?');
    if (youSure) {
        gameDifficulty = parseInt(difficultyLevel.value);
        score = 0;
        numberOfAttempts = 0;
        cardID = 0;
        attempts.innerHTML = numberOfAttempts;
        displayCards(pictures, gameDifficulty);
    }
})

startGameButton.addEventListener('click', function() {
    gameDifficulty = parseInt(difficultyLevel.value);
    score = 0;
    numberOfAttempts = 0;
    cardID = 0;
    attempts.innerHTML = numberOfAttempts;
    displayCards(pictures, gameDifficulty);
})

const cards = document.querySelector('.cards');
let chosenPair = [];

function cardsEventListener(event) {
    if (!(event.target.classList[0] == 'card')) {
        return;
    }
    if (chosenPair[0]) {
        if (event.target.id === chosenPair[0].id) {
            return;
        }
    }
    const clickedCard = event.target;
    clickedCard.style.border = '3px solid orange';
    chosenPair.push(clickedCard);
    if (chosenPair.length == 2) {
        numberOfAttempts++;
        attempts.innerHTML = numberOfAttempts;
        cards.removeEventListener('click', cardsEventListener);
        flipCard(chosenPair[0], chosenPair[1]);
        setTimeout(function() {
            chosenPair[0].style.border = 'none';
            chosenPair[1].style.border = 'none'
            chosenPair = [];
    
        }, 2000)
    }
}
cards.addEventListener('click', cardsEventListener);

function flipCard(firstCard, secondCard) {
    firstCard.style.transform = 'rotateY(0deg)';
    setTimeout(function() {
        firstCard.firstElementChild.style.opacity = '1';
    }, 200);
    secondCard.style.transform = 'rotateY(0deg)';
    setTimeout(function() {
        secondCard.firstElementChild.style.opacity = '1';
    }, 200);
    let firstClass = firstCard.classList[1];
    let firstPair = firstClass.slice(firstClass.indexOf('_') + 1, firstClass.length);
    let secondClass = secondCard.classList[1];
    let secondPair = secondClass.slice(secondClass.indexOf('_') + 1, secondClass.length);
    if (firstPair == secondPair) {
        score++;
        firstCard.classList.add('flipped');
        secondCard.classList.add('flipped');
            cards.addEventListener('click', cardsEventListener);
        return;
    } else {
        unflipCard(firstCard, secondCard)
    }
}

function unflipCard(firstCard, secondCard) {
    setTimeout(function() {
        firstCard.style.transform = 'rotateY(180deg)';
        setTimeout(function() {
            firstCard.firstElementChild.style.opacity = '0';
        }, 200)
    }, 2000);
    setTimeout(function() {
        secondCard.style.transform = 'rotateY(180deg)';
        setTimeout(function() {
            secondCard.firstElementChild.style.opacity = '0';
            cards.addEventListener('click', cardsEventListener);
        }, 200)
    }, 2000);
}

function handleGridSizing(cardCount) {
    if (cardCount <= 9) {
        cards.classList.toggle('cards-columns-6');
    } else if (cardCount > 9 && cardCount <= 12) {
        cards.classList.toggle('cards-columns-8');
    } else {
        cards.classList.toggle('cards-columns-10');
    }
}

function shuffleArray(arr) {
    let shuffledArray = [];
    let usedIndexes = [];
    let i = 0;
    while (i < arr.length) {
        let randomNumber = Math.floor(Math.random() * arr.length);
        if (!usedIndexes.includes(randomNumber)) {
            shuffledArray.push(arr[randomNumber]);
            usedIndexes.push(randomNumber);
            i++;
        }
    }
    return shuffledArray;
}

function displayCards(pictures, gameDifficulty) {
    let cardCount;
    if (gameDifficulty === 2) { // hard
        cardCount = 14;
        maxScore = 7;
    } else if (gameDifficulty === 1) { // medium
        cardCount = 12
        maxScore = 6;
    } else if (gameDifficulty === 0) { // easy
        cardCount = 8;
        maxScore = 4;
    }
    handleGridSizing(cardCount);
    let neededPictures = getRandomElements(pictures, cardCount);
    let i = 0;
    let cards = [];
    let cardID = 0;
    let index = 0;
    while (i < neededPictures.length) {
        let card = `
        <div class="card pair_${index}" id='${cardID++}'>
            <img src="${neededPictures[i]}" alt="">
        </div>`;
        cards.push(card);
        card = `
        <div class="card pair_${index++}" id='${cardID++}'>
            <img src="${neededPictures[i]}" alt="">
        </div>`;
        cards.push(card);
        i++;
    }
    cards = shuffleArray(cards);
    let cardsStr = '';
    cards.forEach(element => {
        cardsStr += element;
    });
    document.querySelector('.cards').innerHTML = cardsStr;
}   


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElements(originalArr, numberOfElements) {
    let randomArr = [];
    for (let i = 0; i < numberOfElements; i++) {
        let randomIndex = getRandomInt(0, originalArr.length - 1);
        if (randomArr.includes(originalArr[randomIndex])) {
            i--;
            continue;
        }
        randomArr.push(originalArr[randomIndex])
    }
    return randomArr;
}
