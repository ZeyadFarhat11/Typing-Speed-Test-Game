// Elements
const select = (e) => document.querySelector(e);
const
    playBtn = select('.play-btn'),
    selectEl = select('select'),
    infoLevel = select('.info span.level'),
    maxScore = select('#max-score'),
    wordsArea = select('.words'),
    currentWord = select('.current-word'),
    writingInput = select('.writing-input'),
    timeLeft = select('#time-left'),
    msg = select('#msg'),
    currentScore = select('#score'),
    wins = select('#wins');


// Check Wins
if (localStorage.speedGame === undefined) {
    let obj = {
        wins: 0,
    }
    localStorage.setItem('speedGame', JSON.stringify(obj))
} else {
    wins.textContent = JSON.parse(localStorage.speedGame).wins;
}

// Change levels Info
selectEl.addEventListener('change', function () {
    let val = this.value;
    infoLevel.textContent = `[${val}]`;
    maxScore.textContent = w[val].length;
});

// Start Playing By Clicking Enter
window.onkeydown = function(e) {
    if (e.keyCode === 13) {
        playBtn.click();
    }
}

// Start Playing
playBtn.addEventListener('click', function () {
    // Gain Details
    let level = selectEl.value;
    let words = w[level];
    let counter = 0;
    // Show And Hide Elements
    playBtn.style.display = 'none';
    currentWord.style.display = 'block';
    currentWord.textContent = words[0];
    selectEl.style.display = 'none';
    writingInput.style.display = 'block';
    wordsArea.classList.add('active');
    // Show Words
    createElements(w[level]);
    // Actions
    writingInput.focus();
    timeLeft.textContent = '5s';
    currentScore.textContent = 0;

    let interval = setInterval(function () {
        let currentTime = timeLeft.textContent;
        if (currentTime !== "0s") {
            timeLeft.textContent = `${parseInt(currentTime) - 1}s`;
        }
        else {
            // If Type Correctly And There Is Words To Write
            if (writingInput.value.toLowerCase() === currentWord.textContent
                &&
                wordsArea.querySelectorAll('span').length > 1
            ) {
                counter += 1;
                currentWord.textContent = w[level][counter];
                timeLeft.textContent = '3s';
                writingInput.value = '';
                document.querySelector('.words span:first-of-type').remove();
                currentScore.textContent = +currentScore.textContent + 1;
            }
            // If Write Correctly And There Is No Words To Write
            else if (writingInput.value.toLowerCase() === currentWord.textContent
                &&
                wordsArea.querySelectorAll('span').length <= 1
            ) {
                clearInterval(interval);
                msg.className = 'success';
                msg.textContent = 'congratulations';
                currentScore.textContent = +currentScore.textContent + 1;
                addWin();
                document.querySelector('.words span:first-of-type').remove();
                setTimeout(function () {
                    // Show And Hide Elements
                    playBtn.style.display = 'block';
                    currentWord.style.display = 'none';
                    selectEl.style.display = 'block';
                    writingInput.style.display = 'none';
                    wordsArea.classList.remove('active');
                    wordsArea.innerHTML = `<p>words will appear here</p>`;
                    msg.textContent = '';
                    msg.className = '';
                    writingInput.value = '';
                }, 2000);
            }
            // If Type Uncorrectly
            else {
                clearInterval(interval);
                msg.className = 'failed';
                msg.textContent = 'you lose';
                setTimeout(function () {
                    // Show And Hide Elements
                    playBtn.style.display = 'block';
                    currentWord.style.display = 'none';
                    selectEl.style.display = 'block';
                    writingInput.style.display = 'none';
                    wordsArea.classList.remove('active');
                    wordsArea.innerHTML = `<p>words will appear here</p>`;
                    msg.textContent = '';
                    msg.className = '';
                    writingInput.value = '';
                }, 2000);
            }
        }
    }, 1000);
});

function createElements(arr) {
    wordsArea.innerHTML = '';
    for (let i in arr) {
        let span = document.createElement('span');
        span.textContent = arr[i];
        wordsArea.append(span);
    }
}

// Disable Pasting
document.onpaste = function (e) {
    e.preventDefault();
}

// Update Wins Value
function addWin() {
    let game = JSON.parse(localStorage.speedGame);
    game.wins += 1;
    localStorage.speedGame = JSON.stringify(game);
    wins.textContent = game.wins;
}