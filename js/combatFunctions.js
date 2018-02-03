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

let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);

function handleClickEvent(evnt){
    //takeDamage();
    
    let enemyHealth = 100;
    let int = 0;
    
    switch(sum){
        case: `1`,
            int = 10;
        break;
        case: `2`,
            int = 20;
        break;
        case: `3`,
            int = 30;
        break;
        case: `4`;
            int = 40;
        break;
        default:
            int = 0;
        break;
            
    }

    enemyHealth -= int;
    let currentEnemyHealth = enemyHealthDisplay.style.width = (enemyHealth + `%`);
    if(currentEnemyHealth === `0%`){
    attackButton();
    }
}

function takeDamage(){
    let enemyHealthDisplay = document.querySelector(`.enemyHealthDisplay`);
    let enemyHealth = 100;
    let int = 0;
    
    if(document.querySelector(`.attackOne`)){
        int = 10;
    }
    if(document.querySelector(`.attackTwo`)){
        int = 20;
    }
    if(document.querySelector(`.attackThree`)){
        int = 30;
    }
    if(document.querySelector(`.attackFour`)){
        int = 40;
    }

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



