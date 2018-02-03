//======== Effect Health ========
/*
function takeDamage(int){
    let healthDisplay = document.querySelector(`.healthDisplay`);
    let health = 100;
    let currentHealth = healthDisplay.style.width;
    console.log(`health was taken`);
    health -= int;
    healthDisplay.style.width = (health + `%`);
}

function enemyTakeDamage(int){
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
    let enemyHealth = 100;
    console.log(`enemy health was taken`);
    enemyHealth -= int;
    enemyHealthDisplay.style.width = (enemyHealth + `%`);
    return enemyHealthDisplay.style.width = (enemyHealth + `%`);
}
*/
//======== Attack ========

function handleClickEvent(evnt){
    let attackOne = document.querySelector(`.attackOne`);
    let attackTwo = document.querySelector(`.attackTwo`);
    let attackThree = document.querySelector(`.attackThree`);
    let attackFour = document.querySelector(`.attackFour`);
    
    let int = 0;
    
    if(attackOne.onclick){
        int = 10;
    }
    
    if(enemyHealth > 0){
        takeDamage(int)
    }
}

let enemyHealth = 100;

function takeDamage(int){
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);

    enemyHealth -= int;
    enemyHealthDisplay.style.width = (enemyHealth + `%`);
}

function attackButton(){
    let attack = document.querySelectorAll(`.attack`);
    for(let i = 0; i < attack.length; i++){
        temp = attack[i];
        temp.addEventListener(`click`, handleClickEvent);
    }
}

attackButton();



