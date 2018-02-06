let stages = [transToTwo, transToThree, transToFour, transToFive, transToSix, transToSeven];
var currentStage = 0;

function two(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="two">However, thousands of years ago, they were threatened by something more dark than anyone could imagine.</h1>`);
}

function three(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="three">A young man, Balin of Aucruth Isles, wanted something more than his small pig farm. His great-grandfather, an unfamiliar mage, left his books behind after he passed. Balin used one of these spells, opeaning a rift to an unknown world.</h1>`);
}

function four(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="four">He believed he could use it to show the power he truly had to everyone. But in reality, he began an new Armageddon.</h1>`);
}

function five(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="five">The Elders called it Dreovosia, a world that is unspoken. Pure Evil and terror flows through it. Once the door had opened, the unthinkable stepped through.</h1>`);
}

function six(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="six">For years, the people fought back. It wasn't untill the Von Esinefaust Clan was able to banish the Unspeakable, that the people could be at peace.</h1>`);
}

function seven(){
    $(`h1`).remove();
    $(`button`).remove();
    $(`div`).append(`<h1 class="seven">But now, the wind is colder. The nights are longer and the shadows are darker. Rumors say the Unspeakable is back to claim Acirhia as it's own. Is it time for a new hero to come out of the shadows, and save us once more?</h1>`);
    $(`body`).append(`<span>
            <a href="Knight.html">Begin Journey...</a>
        </span>`);
}

/*======== Transition Functions ========*/

function transToTwo(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="one2">The world of Acirhia was not always the peaceful place we all know. The Realm of Siletha is known for the peace of it's people. </h1>`);
    setTimeout(two, 3000);
}

function transToThree(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="two2">However, thousands of years ago, they were threatened by something more dark than anyone could imagine.</h1>`);
    setTimeout(three, 3000);

}

function transToFour(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="three2">A young man, Balin of Aucruth Isles, wanted something more than his small pig farm. His great-grandfather, an unfamiliar mage, left his books behind after he passed. Balin used one of these spells, opeaning a rift to an unknown world.</h1>`);
    setTimeout(four, 3000);
}

function transToFive(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="four2">He believed he could use it to show the power he truly had to everyone. But in reality, he began an new Armageddon.</h1>`);
    setTimeout(five, 3000);
}

function transToSix(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="five2">The Elders called it Dreovosia, a world that is unspoken. Pure Evil and terror flows through it. Once the door had opened, the unthinkable stepped through.</h1>`);
    setTimeout(six, 3000);
}

function transToSeven(){
    $(`h1`).remove();
    $(`div`).append(`<h1 class="six2">For years, the people fought back. It wasn't untill the Von Esinefaust Clan was able to banish the Unspeakable, that the people could be at peace.</h1>`);
    setTimeout(seven, 3000);
}

function nextButton(){                                                    //Give Attack Buttons Click Events
    let next = document.querySelector(`.nextButton`);
    //next.addEventListener(`click`, temp);
    /*next.onClick(function(){
        stages[currentStage];
    });*/
    next.addEventListener(`click`, function(){
        console.log(currentStage)
        console.log(stages[currentStage])
        stages[currentStage]();
        currentStage++;
    });
    
}

//function temp(){
//    let next = document.querySelector(`.nextButton`);
//    next.onClick();
//}

nextButton();
