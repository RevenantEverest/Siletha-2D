function knightButtonFunction(){
    let knightButton = document.querySelector(`.knight`);
    knightButton.addEventListener(`click`, function(){
        window.location.href = `Knight.html`;
    });
}

function wizardButtonFunction(){
    let wizardButton = document.querySelector(`.wizard`);
    wizardButton.addEventListener(`click`, function(){
        window.location.href = `Wizard.html`;
    });
}

function archerButtonFunction(){
    let archerButton = document.querySelector(`.archer`);
    archerButton.addEventListener(`click`, function(){
        window.location.href = `Archer.html`;    
    });
}

knightButtonFunction();
wizardButtonFunction();
archerButtonFunction();