let gameSeq=[];
let userSeq=[]; 
let start=false; 
let level=0; 
let highScore=-1; 

let btns=['yellow','red','purple','green']; 
let h3 = document.querySelector('h3'); 
let h2 = document.querySelector('h2')

let allBtn = document.querySelectorAll('.btn'); 


document.addEventListener('keypress',function(){
    if(start==false){
        start=true; 
        levelUp(); 
    }
})

function levelUp(){
    userSeq=[]; 
    level++; 
    h3.innerText = `level ${level}`; 

    let randomIndex = Math.floor(Math.random()*3)
    let randomColor = btns[randomIndex]; 
    let randombtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq); 
    gameFlash(randombtn); 

}
function gameFlash(btn){
    btn.classList.add('flash'); 
    setTimeout(function(){
        btn.classList.remove('flash');
    },250); 
}
function userFlash(btn){
    btn.classList.add('userFlash'); 
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },250); 
}

function SoundEffect() {
    let sound = new Audio('/asset/button.mp3');
    sound.play();

    setTimeout(function(){
        sound.pause();
    },1000);

}

function endSoundEffect() {
    let sound = new Audio('/asset/end.mp3');
    sound.play();

    setTimeout(function(){
        sound.pause();
    },1000);

}

for (let btn of allBtn) {
    btn.addEventListener('click', btnPress);
}

function btnPress(){
    let btn = this; 
    userFlash(btn); 
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1)
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        SoundEffect();
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),1000); 
        } 
    }
    else{
        endSoundEffect(); 
        h3.innerHTML = `Gamer Over! Youre Score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector('body').style.backgroundColor='red'; 
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white'; 
        },250);
        if(level>highScore){
            highScore=level; 
            h2.innerText = `High Score: ${highScore}`;
        } 
        reset(); 
    }
}
function reset(){
    start=false;
    gameSeq=[];
    userSeq=[];
    level=0; 
}
