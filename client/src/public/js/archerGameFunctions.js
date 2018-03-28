function fightSequence(){
    $(`.wizardGameFunctions`).remove();
    $(`#container`).remove();
    $(`.playerAvatarContainer`).remove();
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
        <script class="wizardGameFunctions" src="js/wizardGameFunctions"></script>`);
    attackButton();
    potionButton();
    mainThemeStop();
    battleTheme();
}

//======== Global Variables ========
let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
let enemyHealth = storeEnemyHealth();
let playerHealth = storePlayerHealth();
let potionUse =  0;//storePotionUse();

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
        takeDamage(playerDamage);
        projectile();
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
    usePotion();
    console.log(`Should heal`);
}
/*======== End ========*/

//======== Damage Functions ========

function takeDamage(int){
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
    
    enemyHealth -= int;
    enemyHealthDisplay.style.width = (enemyHealth + `%`);
    shootArrow();
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
    axeHitFlesh();
    
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

/*======== Projectile States ========*/
function projectile(){
    $(`.spriteContainer`).append(`<div class="projectile"></div>`);
    setTimeout(removeProjectile, 1000);
}

function removeProjectile(){
    $(`.projectile`).remove();
}

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
    createAvatar();
    createGrid(50);
    enemyHealth = 100;
    playerHealth = 100;
    battleThemeStop();
    mainTheme();
    
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

function createGrid(int) {
    for (let rows = 0; rows < int; rows++) {
        for (let columns = 0; columns < int; columns++) {
            if(myMatrix.get(rows, columns) === 1){
                //$(`#container`).append(`<div class="gridRed"></div>`);
                let temp = $(`<div class="grid" id="`+rows+columns+`"></div>`);
                temp.css("background-color", "red");
                $(`#container`).append(temp);
            }else{
                $(`#container`).append(`<div class="grid" id="`+rows+columns+`"></div>`);
                //console.log(`Adding NotRed`);
            }
        }
    }
    $(`.grid`).width(760/int);
    $(`.grid`).height(760/int);
    $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "blue");
}

function createAvatar(){
        $(`.wizardGameFunctions`).remove();
        $(`body`).append($(`<div id="container">
        </div>
        <div class="playerAvatarContainer">
            <div class="playerStatusContainer">    
                <h1 class="playerHealthText">HEALTH :</h1>
            <div class="playerHealthOutline">
                <div class="playerHealthDisplay"></div>
            </div>
            </div>
            <div class="playerIdle"></div>
            <div class="healthPotions">
                <div class="healthPotionIcon">
                </div>
                <h1 class="potionCount">10</h1>
            </div>
        </div>`));
}


//Taken From Eloquent Javascript Chapter 6
class Matrix {
  constructor(width, height, content = () => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = content(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

let myMatrix;

function createMatrix(){
    myMatrix = new Matrix(50, 50);
    for(let i = 0; i < myMatrix.width; i++){
        for(let x = 0; x < myMatrix.height; x++){
            let temp = RNG(500);
            if(temp < 10){
                myMatrix.set(i, x, 1);
            }else{
                myMatrix.set(i, x, 0);
            }
            console.log(myMatrix.get(i, x));
        }
    }
}

let playerXY = {
    xpos: 0,
    ypos: 0,
};

function playerMovement(direction){
    $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "rgba(0, 0, 0, .5)");
    if(direction === `left`){
        playerXY.ypos -= 1;
        $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "blue");
        $(`#` + (playerXY.xpos) + (playerXY.ypos) + 1).css("background-color", "rgba(0, 0, 0, .5)");
    }
    else if(direction === `right`){
        playerXY.ypos += 1;
        $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "blue");
        $(`#` + (playerXY.xpos) + (playerXY.ypos) - 1).css("background-color", "rgba(0, 0, 0, .5)");
    }
    else if(direction === `up`){
        playerXY.xpos -= 1;
        $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "blue");
        $(`#` + (playerXY.xpos + 1) + (playerXY.ypos)).css("background-color", "rgba(0, 0, 0, .5)");
    }
    else if(direction === `down`){
        playerXY.xpos += 1;
        $(`#` + playerXY.xpos + playerXY.ypos).css("background-color", "blue");
        $(`#` + (playerXY.xpos + 1) + (playerXY.ypos)).css("background-color", "rgba(0, 0, 0, .5)");
    }
    checkForEnemy();
}

function checkForEnemy(){
    if(myMatrix.get(playerXY.xpos,playerXY.ypos) === 1){
       fightSequence();
        console.log(`New Please Work`);
    }
}

//Modified from W3Schools Example
function keyPress(event) {
    var x = event.which || event.keyCode;
    if(x === 119){
        playerMovement(`up`);
    }
    if(x === 97){
        playerMovement(`left`);
    }
    if(x === 115){
        playerMovement(`down`);
    }
    if(x === 100){
       playerMovement(`up`);
    }
}

document.onkeydown = checkKey;

function checkKey(e) {
    
    e = e || window.event;

    if (e.keyCode == `87`) {
        playerMovement(`up`);
    }
    else if (e.keyCode == `65`) {
        playerMovement(`left`);
    }
    else if (e.keyCode == `83`) {
       playerMovement(`down`);
    }
    else if (e.keyCode == `68`) {
       playerMovement(`right`);
    }

}

function mainTheme(){
    let theme = document.querySelector(`.mainTheme`);
    theme.play();
}

function mainThemeStop(){
    let theme = document.querySelector(`.mainTheme`);
    theme.pause();
}

function battleTheme(){
    let theme = document.querySelector(`.battleTheme`);
    theme.currentTime = 0;
    theme.play();
}

function battleThemeStop(){
    let theme = document.querySelector(`.battleTheme`);
    theme.pause();
}

function shootArrow(){
    let theme = document.querySelector(`.shootArrow`);
    theme.currentTime = 0;
    theme.play();
}

function axeHitFlesh(){
    let theme = document.querySelector(`.axeHitFlesh`);
    theme.currentTime = 0;
    theme.play();
}

function usePotion(){
    let theme = document.querySelector(`.usePotion`);
    theme.currentTime = 0;
    theme.play();
}

mainTheme();

createAvatar();
createMatrix();
createGrid(50);
reload();
