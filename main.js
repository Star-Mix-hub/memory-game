//varieble
const gameField = document.querySelector(".game-field");

const btnStart = document.querySelector(".start-btn");
const victoryMessage = document.querySelector(".victory-message");


const musicPlayr = document.querySelector(".music");
musicPlayr.src = "./music/music.mp3";
musicPlayr.setAttribute("autoplay", "true")
musicPlayr.setAttribute("loop", "true")





//src images
const imagesSrc = [
    "img/hero/hero1.jpg",
    "img/hero/hero2.jpg",
    "img/hero/hero3.jpg",
    "img/hero/hero4.jpg",
    "img/hero/hero5.jpg",
    "img/hero/hero6.jpg",
]

const randomImages = createRandomImages(imagesSrc)
const cards = createCards(randomImages,createAndAddClass);

const visibleCards = [];




// rander draw all after click button
function randerWorld(cards){
    //clear text content in game field and show field
    // gameField.textContent = "";
    gameField.style.display = "grid";

    //display none for btnStart and victory message
    victoryMessage.style.display = "none";
    btnStart.style.display = "none";

    for(let i = 0; i < cards.length; i++){
        gameField.append(cards[i])
    }

}


function victory(){
    victoryMessage.style.display = "block";
}

function handleClickOnCard(e){
    if(visibleCards.length === 12){
        victory()
        return;
    }
    const carentCard = e.target.closest(".card");
    carentCard.classList.add("visible");
    visibleCards.push(carentCard)

    if(visibleCards.length % 2 ===  0){
        const lastElem = visibleCards[visibleCards.length -1];
        const prevLastElem = visibleCards[visibleCards.length -2];
        if(lastElem.querySelector("img").src !== prevLastElem.querySelector("img").src){
             visibleCards.pop(visibleCards.length -1)
             visibleCards.pop(visibleCards.length -2)
             lastElem.classList.remove("visible");
             prevLastElem.classList.remove("visible");
        }
     }
    
}



function gameStart(){
    randerWorld(cards);
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => card.addEventListener("click",function(e){
        handleClickOnCard(e);
    }))
    
   
}

btnStart.addEventListener("click", gameStart)


function createRandomImages(imagesSrc){
    const randomImages = [];
    const countImageCard = {};

    // geven elements in countImageCard value 0
    for(let imageSrc of imagesSrc){
        countImageCard[imageSrc] = 0;
    }
    
    const randomNum = Math.floor(Math.random() * imagesSrc.length)
    const randElem = imagesSrc[randomNum];

    while(randomImages.length < 12){
        const randomNum = Math.floor(Math.random() * imagesSrc.length)
        const randElem = imagesSrc[randomNum];

        if(countImageCard[randElem] < 2){
            countImageCard[randElem]++;
            const img = document.createElement("img");
            img.classList.add("card__img");
            img.src = imagesSrc[randomNum];
            randomImages.push(img)
        }
    }

    return randomImages
    
}


function createCards(randomImages,createAndAddClass){
    const cards = [];
    
    for(let i = 0; i < randomImages.length; i++){
        const card = createAndAddClass("div","card")
        const cardWrapp = createAndAddClass("div","card__wrapp")
        
        const cardBack = createAndAddClass("div","card__back")
        cardBack.appendChild(randomImages[i])
       
        const cardFront = createAndAddClass("div","card__front")
        cardFront.textContent = "?"

        cardWrapp.appendChild(cardBack)
        cardWrapp.appendChild(cardFront)
        card.appendChild(cardWrapp);
        cards.push(card)
    }

    return cards;
}


function createAndAddClass(elem,className){
    const createElem = document.createElement(elem);
    createElem.classList.add(className)
    return createElem
}

