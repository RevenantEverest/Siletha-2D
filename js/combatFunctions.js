//======== Global Variables ========
let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
let enemyHealth = storeEnemyHealth();
let playerHealth = storePlayerHealth();

function storePlayerHealth(){
    let playerHealth = 100;
    return playerHealth;
}

function storeEnemyHealth(){
    let enemyHealth = 100;
    return enemyHealth;
}
/*======== End ========*/

//======== Button Functionality ========
function attackButton(){                                                    //Give Attack Buttons Click Events
    let attack = document.querySelectorAll(`.attack`);
    for(let i = 0; i < attack.length; i++){
        temp = attack[i];
        temp.addEventListener(`click`, handleClickEvent);
    }
}

function handleClickEvent(evnt){                                            //What happens when button is clicked
    let value = evnt.target.dataset.increment;
    
    if(enemyHealth < value){
        value = enemyHealth;
    }
    takeDamage(value);
    if(enemyHealth <= 0){
        winFight();
    }

    attackAnimKnightOne();
    setTimeout(enemyAttack, 1000);
    setTimeout(attackAnimKnightTwo, 1000);
}
/*======== End ========*/

//======== Damage Functions ========
function takeDamage(int){                                                   //Player Deals Damage
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);

    enemyHealth -= int;
    enemyHealthDisplay.style.width = (enemyHealth + `%`);
}

function enemyAttack(){                                                     //Enemy Deals Damage
    let playerHealthDisplay = document.querySelector(`.healthDisplay`);
    //let enemyInt = Math.floor(Math.random() * 30);
    let enemyInt = testGen();
    
    
    if(playerHealth < enemyInt){
        enemyInt = enemyHealth;
    }
    
    playerHealth -= enemyInt;
    playerHealthDisplay.style.width = (playerHealth + `%`);
}
/*======== End ========*/

//======== Knight One States ========

function attackAnimKnightOne(){                                              //Knight One Set Attack
    let idle = document.querySelector(`.knightIdle`);
    document.querySelector(`.spriteContainer`).removeChild(idle);
    $(`.spriteContainer`).append(`<div class="knightAttack"></div>`);
    
    
    setTimeout(setIdleKnightOne, 1000);
}

function setIdleKnightOne(){                                                //Knight One Set Idle
    let attack = document.querySelector(`.knightAttack`);
    document.querySelector(`.spriteContainer`).removeChild(attack);
    
    $(`.spriteContainer`).append(`<div class="knightIdle"></div>`)
}
/*======== End ========*/

//======== Knight Two States ========

function attackAnimKnightTwo(){                                              //Knight Two Set Attack
    let idle = document.querySelector(`.knight2Idle`);
    document.querySelector(`.spriteContainer`).removeChild(idle);
    $(`.spriteContainer`).append(`<div class="knight2Attack"></div>`);
    
    
    setTimeout(setIdleKnightTwo, 1000);
}

function setIdleKnightTwo(){                                                //Knight Two Set Idle
    let attack = document.querySelector(`.knight2Attack`);
    document.querySelector(`.spriteContainer`).removeChild(attack);
    
    $(`.spriteContainer`).append(`<div class="knight2Idle"></div>`)
}
/*======== End ========*/

//======== Win/Lose ========
function winFight(){
    document.body.classList.add(`game-overWin`);
}
function loseFight(){
    
}
/*======== End ========*/

attackButton();

function testGen(){
    let enemyInt = Math.floor(Math.random() * 30);
    return enemyInt;
    console.log(enemyInt);
}