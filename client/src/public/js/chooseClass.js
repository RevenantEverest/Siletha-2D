function knightButtonFunction(){
    let knightButton = document.querySelector(`.knight`);
    knightButton.addEventListener(`click`, function(){
        buttonPress();
        setTimeout(function(){
            window.location.href = `Knight.html`;
        }, 1000);
    });
}

function wizardButtonFunction(){
    let wizardButton = document.querySelector(`.wizard`);
    wizardButton.addEventListener(`click`, function(){
        buttonPress();
        setTimeout(function(){
            window.location.href = `Wizard.html`;
        }, 1000);
    });
}

function archerButtonFunction(){
    let archerButton = document.querySelector(`.archer`);
    archerButton.addEventListener(`click`, function(){
        buttonPress();
        setTimeout(function(){
            window.location.href = `Archer.html`;
        }, 1000);    
    });
}

function classTheme(){
    let theme = document.querySelector(`.mainTheme`);
    theme.play();
}

function buttonPress(){
    let theme = document.querySelector(`.buttonPress`);
    theme.play();
}

classTheme();

knightButtonFunction();
wizardButtonFunction();
archerButtonFunction();