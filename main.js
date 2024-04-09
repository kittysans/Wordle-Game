// board
let clos = [4, 5, 6, 7, 8]
let indexClo = 1
let rows = 6
let board

// keyboard
let keyBoard
let keys

// pick number
let pickNumberOfLetters

// word
let fourLetterWords = ['Fish', 'Hike', 'Jump', 'Lend', 'Pint'];
let fiveLetterWords = ['Apple', 'Baker', 'Chalk', 'Dress', 'Early'];
let sixLetterWords = ['Banana', 'Orange', 'Guitar', 'Rocket', 'Window'];
let elevenLetterWords = ['Eavesdroppy', 'Hedgehopper', 'Jackhammer', 'Razzmatazz', 'Spacecrafts'];
let eightLetterWords = ['Elephant', 'Rainfall', 'Sunshine', 'Keyboard', 'Rainbow'];

let allWords = [fourLetterWords, fiveLetterWords, sixLetterWords, elevenLetterWords, eightLetterWords];

let word
let objectWordUpperCase
let currWord = []
let letterBox
let countGuess = 0

// popup
let settingPopup
let howToPlayPopup

let playerState = document.getElementById('state')
let correctWord = document.getElementById('correct-word')

let gameEnd = false

window.onload = () => {
    getWord()
    createBoard()
    createInputKey()
    createPickNumberOfLetter()
    addEventOnHeaderButton()
}

function getWord() {
    let words = allWords[indexClo]

    randomIndex = Math.floor(Math.random() * words.length)

    word = words[randomIndex].toUpperCase()
}

function createBoard() {
    // get board
    board = document.getElementById('board')

    // create all box word
    for (let c = 0; c < rows; c++) {
        // col
        let rowElement = document.createElement('div')
        rowElement.classList.add('row')

        // row
        for (let r = 0; r <  clos[indexClo]; r++) {
            // box
            let box = document.createElement('div')
            box.classList.add('box')

            rowElement.append(box)
        }
        // put on the board
        board.append(rowElement)
    }
}

function createInputKey() {
    if (gameEnd) return
    // get input key
    keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'delete', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter']
    keyBoard = document.getElementById('keyboard')

    // create new line
    let row
    for (let i = 0; i < keys.length; i++) {
        // add key on keyboard
        if (i == 0 || i == 10 || i == 19) {
            row = document.createElement('div')
            row.classList.add('row')
            if (row) keyBoard.append(row)
        }

        // create key
        let buttonKey = document.createElement('div')
        buttonKey.classList.add('key')
        if (keys[i] == 'enter' || keys[i] == 'delete') buttonKey.classList.add('button')
        buttonKey.innerText = keys[i]

        buttonKey.addEventListener('click', addEventListenerOnButtonAndKeyBoard)

        row.append(buttonKey)
    }

    document.addEventListener('keydown', addEventListenerOnButtonAndKeyBoard)
}

function addEventListenerOnButtonAndKeyBoard(e) {
    if (e.code) {
        letter = e.code.split('')[3]

        if (e.code.includes('Key')) pushAZOnBoard(letter)
        else if (e.code == 'Backspace' && currWord) removeAZOnBoard()
        else if (e.code == 'Enter') checkAnswer()
    }
    else {
        letter = e.target.innerText
        
        if (e.target.innerText == 'Delete') removeAZOnBoard()
        else if (e.target.innerText == 'Enter') checkAnswer()
        else pushAZOnBoard(letter)
    }
}

function pushAZOnBoard(letter) {
    if (gameEnd) return

    if (currWord.length >= clos[indexClo]) return

    currWord.push(letter)
    updateCurrWord()
}

function removeAZOnBoard() {
    if (gameEnd) return

    currWord.pop()
    updateCurrWord()
}

function updateCurrWord() {
    letterBox = board.querySelectorAll('.row')
    letterBox = letterBox[countGuess].querySelectorAll('.box')

    for (let i = 0; i < letterBox.length; i++) {
        letterBox[i].innerText = ''
        letterBox[i].classList.remove('have-letter')

        if (!currWord[i]) return
        letterBox[i].innerText = currWord[i]
        letterBox[i].classList.add('have-letter')
    }
}

function checkAnswer() {
    if (gameEnd) {
        Newgame()
        return
    }

    if (currWord.length < word.split('').length) return

    // create correct objcet word
    objectWordUpperCase = word.split('')

    // add style on letter box
    for (let i = 0; i < clos[indexClo]; i++) {
        if (letterBox[i].innerText == objectWordUpperCase[i]) {
            letterBox[i].classList.add('correct')
            addStyleOnButtonKey(letterBox[i].innerText, 'correct')
        }
        else if (word.toUpperCase().includes(letterBox[i].innerText)) {
            letterBox[i].classList.add('present')
        }
        else {
            letterBox[i].classList.add('absent')
            addStyleOnButtonKey(letterBox[i].innerText, 'absent')
        }
    }

    if (currWord.length == clos[indexClo] && currWord.every((letter,index) => letter == objectWordUpperCase[index])) {
        // won
        gameEnd = true
        playerState.innerText = 'you won! 🏆'
        correctWord.innerText = ''

        return
    }

    countGuess += 1
    currWord = []

    if (countGuess == rows) {
        // lose
        gameEnd = true
        playerState.innerText = 'you lost!'
        correctWord.innerText = `correct word: ${word}`

        return
    }
}

function resetWord() {
    // reset value
    getWord()
    currWord = []
    countGuess = 0
}

function addStyleOnButtonKey(letter, className) {
    allButtonKey = keyBoard.querySelectorAll('.key')

    for (let i = 0; i < allButtonKey.length; i++) {
        if (allButtonKey[i].innerText == letter) allButtonKey[i].classList.add(`${className}`)
    }
}

function createPickNumberOfLetter() {
    pickNumberOfLetters = document.getElementById('pick-number-letters')

    for (let i = 0; i < clos.length; i++) {
        let newBox = document.createElement('div')
        newBox.classList.add('box-number-letter')
        newBox.innerText = clos[i]

        if (clos[i] == clos[indexClo]) newBox.classList.add('curr-number-of-letter')

        newBox.addEventListener('click', updateNumberOfLetters)

        pickNumberOfLetters.append(newBox)
    }
}

function updateNumberOfLetters(e) {
    indexClo = e.target.innerText - 4

    let allBoxNumberOfletters = pickNumberOfLetters.querySelectorAll('.box-number-letter')

    // reset number of letter
    for (let i = 0; i < allBoxNumberOfletters.length; i++) {
        allBoxNumberOfletters[i].classList.remove('curr-number-of-letter')
        if (allBoxNumberOfletters[i].innerText == clos[indexClo]) allBoxNumberOfletters[i].classList.add('curr-number-of-letter')
    }

    // reset board
    board.innerHTML = ''
    createBoard()

    // reset word
    resetWord()

    closeAllPopup()
}

function addEventOnHeaderButton() {
    settingPopup = document.getElementById('settings-popup')
    howToPlayPopup = document.getElementById('how-popup')

    settingButton = document.getElementById('setting').addEventListener('click', () => settingPopup.classList.toggle('show'))
    questionButton = document.getElementById('question').addEventListener('click', () => howToPlayPopup.classList.toggle('show'))

    playerState = document.getElementById('state')
    correctWord = document.getElementById('correct-word')

    let arrayCloseSettigButton = document.querySelectorAll('#close-setting-button')
    arrayCloseSettigButton.forEach(button => {
        button.addEventListener('click', closeAllPopup)
    })
    
    let newGameButton = document.getElementById('new-game')

    newGameButton.addEventListener('click', Newgame)
}

function Newgame() {
    gameEnd = false

    // reset board
    board.innerHTML = ''
    createBoard()
    
        // reset keyboard
    keyBoard.innerHTML = ''
    createInputKey()

    resetWord()

    playerState.innerText = 'playing...'
    correctWord.innerText = ''
}

function closeAllPopup() {
    settingPopup.classList.remove('show')
    howToPlayPopup.classList.remove('show')
}