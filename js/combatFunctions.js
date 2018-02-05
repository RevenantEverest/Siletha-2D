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
    let playerDamage = RNG(value);
    let enemyDamage = RNG(30);
    
    if(enemyHealth < playerDamage){ //If enemy health is lower then player damage, adjust player damage to finish off enemy
        playerDamage = enemyHealth;
    }
    
    if(playerHealth < enemyDamage){ //If player health is lower then enemy damage, adjust enemy damage to finish off player
        enemyDamage = playerHealth;
    }
    
    if(enemyHealth <= 0){           //Check if player won fight
        winFight();
    }
    
    if(playerHealth <= 0){          //Check if player lost fight
        loseFight();
    }
    
    if(playerHealth > 0){           //Allow player attack anim if player health is above 0
        attackAnimKnightOne();
        takeDamage(playerDamage);
    }
    
    let damageEnemy = enemyAttack(enemyDamage);
    
    if(enemyHealth > 0){            //Allow enemy to attack if health is above 0
        setTimeout(damageEnemy, 1000);
        setTimeout(attackAnimKnightTwo, 1000);
    }
    
    if(playerHealth <= 0){
        knightOneDie();
    }
    if(enemyHealth <= 0){
        knightTwoDie();
    }
    
    return console.log(`Enemy did ` + enemyDamage + ` points of damage`) + console.log(`Player did ` + playerDamage + ` points of damage`);;
    //setTimeout(enemyAttack, 1000);
    //setTimeout(attackAnimKnightTwo, 1000);
}
/*======== End ========*/

//======== Damage Functions ========

function takeDamage(int){
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);

    enemyHealth -= int;
    enemyHealthDisplay.style.width = (enemyHealth + `%`);
}

function enemyAttack(int){                                                     //Enemy Deals Damage
    let playerHealthDisplay = document.querySelector(`.healthDisplay`);
    
    playerHealth -= int;
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
    
function knightOneDie(){
    let idle = document.querySelector(`.knightIdle`);
    let attack = document.querySelector(`.knightAttack`);
    if(idle){
        document.querySelector(`.spriteContainer`).removeChild(idle);
    }else{
        document.querySelector(`.spriteContainer`).removeChild(attack);
    }
    
    $(`.spriteContainer`).append(`<div class="knightDie"></div>`);
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

function knightTwoDie(){
    let idle = document.querySelector(`.knight2Idle`);
    let attack = document.querySelector(`.knight2Attack`);
    if(idle){
        document.querySelector(`.spriteContainer`).removeChild(idle);
    }else{
        document.querySelector(`.spriteContainer`).removeChild(attack);
    }
    
    $(`.spriteContainer`).append(`<div class="knight2Die"></div>`);
}
/*======== End ========*/

//======== Win/Lose ========
function winFight(){
    $(`body`).append();
}
function loseFight(){
    document.body.classList.add(`game-overLose`);
}
/*======== End ========*/


function RNG(int){
    let numGen = Math.floor(Math.random() * int);
    return numGen;
    console.log(numGen);
}

attackButton();

//======== To Do List ========
/*

    >Visual pop ups displaying damage delt
    >Better CSS
    >Allow for multiple class choice (has its own set of To-Do's)

*/
