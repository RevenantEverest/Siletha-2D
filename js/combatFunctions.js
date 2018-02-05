function fightSequence(){
    let combatScript = $(`.combatScript`);
    $(`.combatScript`).remove();
    $(`body`).append(`<div class="header">
            <div class="healthText"><h1>Health</h1></div>
            <div class="healthBarContainer">
                <div class="healthOutline">
                    <div class="healthDisplay"></div>
                </div>
            </div>
            <div class="enemyHealthText"><h1>Enemy Health</h1></div>
            <div class="enemyHealthBarContainer">
                <div class="enemyHealthOutline">
                    <div class="enemyHealthDisplay"></div>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="mainBG">
                <div class="spriteContainer">
                    <div class="knightIdle"></div>
                    <div class="knight2Idle"></div>
                </div>
                <div class="winLose">
                    <img src="images/transparentPlaceholder.png" class="victory">       
                </div>
                <div class="actionContainer">
                    <div class="actionBox">
                        <div class="attacks">
                            <button type="button" class="button attack attackOne" data-increment= 10>Attack One</button>
                            <button type="button" class="button attack attackTwo" data-increment= 20>Attack Two</button>
                            <button type="button" class="button attack attackThree" data-increment= 30>Attack Three</button>
                            <button type="button" class="button attack attackFour" data-increment= 40>Attack Four</button>
                            <button type="button" class="potions" id="healthPotionButton"><div class="potionContainer"></div></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script class="combatScript" src="js/combatFunctions.js"></script>`);
    attackButton();
    potionButton();
}

//======== Global Variables ========
let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
let enemyHealth = storeEnemyHealth();
let playerHealth = storePlayerHealth();
let potionUse = storePotionUse();
const maxPlayerHealth = 100;

function storePotionUse(){
    let potionUse = 3;
    return potionUse;
}

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

function potionButton(){
    let potion = document.querySelector(`.potions`);
    potion.addEventListener(`click`, handlePotionClick);
}

function continueButton(){
    let continueButton = document.querySelector(`.continue`);
    continueButton.addEventListener(`click`, fightEnd);
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
    
    if(playerHealth >= 0){           //Allow player attack anim if player health is above 0
        attackAnimKnightOne();
        takeDamage(playerDamage)
    }
    
    let attackPlayer = enemyAttack(enemyDamage);
    
    if(enemyHealth > 0 && playerHealth > 0){            //Allow enemy to attack if health is above 0
        setTimeout(attackAnimKnightTwo, 1000)
        attackPlayer;
    }
    
    if(playerHealth <= 0){
        setTimeout(function(){
            knightOneDie();
            loseFight();
        }, 1000)
    }
    if(enemyHealth <= 0){
        knightTwoDie();
        winFight();
    }
    
    return console.log(`Enemy did ` + enemyDamage + ` points of damage`) + console.log(`Player did ` + playerDamage + ` points of damage`);;
    //setTimeout(enemyAttack, 1000);
    //setTimeout(attackAnimKnightTwo, 1000);
}

function handlePotionClick(evnt){
    healPlayer();
    console.log(`Should heal`);
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
    
    if(enemyHealth > 0){
        playerHealth -= int;
        setTimeout(function(){
        playerHealthDisplay.style.width = (playerHealth + `%`);
        },1500)
    }
}
/*======== End ========*/

//======== Heal Functions ========

function healPlayer(){
    let playerHealthDisplay = document.querySelector(`.healthDisplay`);
    let potionHealValue = 20;
    let currentHealth = parseInt(playerHealthDisplay.style.width.replace('%',''));
    let maxPosHealing = 100-currentHealth;
    
    if(playerHealth < 100 && playerHealth != 0){
        potionUse -= 1;
        
        if(potionUse != 0){
            if(maxPosHealing < 20){
                playerHealthDisplay.style.width = `100%`;
            }else{
                playerHealth += 20;
                playerHealthDisplay.style.width = (playerHealth + `%`);
            }
        }
        if(potionUse = 0){
            alert(`No more potions left`);
            disablePotion();
        }
        
    }
}

function disablePotion(){
    //$(`#healthPotionButton`).remove();
    //$(`.attacks`).append(`<button type="button" disabled class="potions" id="healthPotionButton"><div class="potionContainer"></div></button>`);
    document.getElementById(`#healthPotionButton`).disabled = true;
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
    $(`.winLose`).append(`<img class="victory" src="images/Victory.png">`);
    $(`.winLose`).append(`<div class="continueContainer"><button type="button" class="continue">CONTINUE</button></div>`);
    $(`.actionContainer`).remove();
    continueButton();
}
function loseFight(){
    $(`.winLose`).append(`<img class="defeat" src="images/Defeat.png">`);
    $(`.winLose`).append(`<div class="continueContainer"><a class="gameOver" href="index.html">Game Over</a></div>`);
    $(`.actionContainer`).remove();
}
/*======== End ========*/


function RNG(int){
    let numGen = Math.floor(Math.random() * int);
    return numGen;
    console.log(numGen);
}

function fightEnd(){
    $(`.header`).remove();
    $(`.main`).remove();
    $(`.footer`).remove();
}

//======== To Do List ========
/*

    >Visual pop ups displaying damage delt
    >Better CSS
    >Allow for multiple class choice (has its own set of To-Do's)
    >Add sounds for taking damage
    >Add winning and losing sounds
    >Add story mode
*/
/*============================================= End of Fight Sequence =============================================*/

/*============================================= Beginning of Dungeon Crawler =============================================*/

function createGrid(x) {
    for (let rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $("#container").append("<div class='grid'></div>");
        }
    }
    $(".grid").width(760/x);
    $(".grid").height(760/x);
}

createGrid(20);

//create grid
//spawn a color square representing the player
//be able to move the player
