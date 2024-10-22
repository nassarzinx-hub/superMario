const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let startTime, updatedTime, difference, t;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
startChronometer();
const jump = () => {    
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = '../images/game-over2.png';
        mario.style.width= '75px';
        mario.style.marginLeft = '50px';
        clearInterval(loop);
stopChronometer();      
    }

}, 10);



function startChronometer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        t = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stopChronometer() {
    clearInterval(t);
    running = false;
}

function resetChronometer() {
    clearInterval(t);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds);
}

// Event listeners
//startButton.addEventListener('click', startChronometer);
//stopButton.addEventListener('click', stopChronometer);
//resetButton.addEventListener('click', resetChronometer);

document.addEventListener('keydown', jump);