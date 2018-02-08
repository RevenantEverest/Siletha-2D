function menuTheme(){
    let theme = document.querySelector(`audio`);
    theme.play();
}

function play(){
    /*setTimeout(function(){
        let theme = document.querySelector(`.play`);
        theme.play();
    }, 1000);*/
    let theme = document.querySelector(`.play`);
        theme.play();
}

function playButton(){
    let knightButton = document.querySelector(`.playButton`);
    knightButton.addEventListener(`click`, function(){
        play();
        setTimeout(function(){
            window.location.href = `intro.html`;      
        }, 1000);
    });
}

menuTheme();
playButton();