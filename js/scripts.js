//Categories

let PolishCategoriesNames = ['Rodzina','Zwierzęta','Ubrania','Krajobraz','Komputer'];
let GermanCategoriesNames = ['Familie','Tiere','Kleidung','Landschaft','Computer'];

//Category Words
let PolishWordsFamily = ['Mama', 'Tata', 'Rodzice', 'Siostra', 'Brat','Dziecko','Córka','Syn','Rodzeństwo', 'Ciocia', 'Wujek','Babcia','Dziadek'];
let GermanWordsFamily = ['die Mutter', 'der Vater', 'die Eltern', 'die Schwester', 'der Bruder','das Kind','die Tochter','der Sohn', 'die Geschwister', 'die Tante', 'der Onkel','die Oma','der Opa'];

let PolishWordsAnimals = ['Pies','Kot','Chomik','Świnka morska','Mysz','Ryba','Wąż','Żółw','Papuga','Króliczek','Kanarek','Papużka falista','Koń','Weterynarz','Schronisko','karmić','wyprowadzać (na spacer)','czyścić'];
let GermanWordsAnimals = ['der Hund','die Katze','der Hamster','das Meerschweinchen','die Maus','der Fisch','die Schlange','die Schildkröte','der Papagei','das Kaninchen','der Kanarienvogel','der Wellensittich','das Pferd','der Tierarzt','das Tierheim','füttern','ausführen / Gassi gehen mit','reinigen'];

let PolishWordsClothes = ['Spódnica','Sukienka','Podkoszulek','Koszula','Spodnie','Krótkie spodenki','Bluza sportowa','Sweter','Kurtka','Buty','Skarpetki','Czapka'];
let GermanWordsClothes = ['der Rock','das Kleid','das T-Shirt','das Hemd','die Hose','die Kurzhose','die Sportbluse','der Pulli / der Pullover','die Jacke','die Schuhe','die Socker','die Mütze'];

let PolishWordsLandscape = ['Góry','Morze','Jezioro','Wybrzeże','Plaża','Wydma','Las','Pustynia','Brzeg','Dolina','Góra','Szczyt','Wyspa','Rzeka','Skała','Kamień','Pagórek','płaski','górzysty','stromy','malowniczy','niepowtarzalny'];
let GermanWordsLandscape = ['das Gebirge / die Berge','das Meer / die See','der See','die Küste','der Strand','die Düne','der Wald','die Wüste','das Ufer','das Tal','der Berg','der Gipfel','die Insel','der Fluss','der Fels','der Stein','der Hügel','flach','bergig','steil','malerisch','einzigartig'];

let PolishWordsComputer = ['Komputer','Drukarka','Touchpad','Mysz','Monitor','Klawiatura','Hasło','Aplikacja','Plik','zapisać','usuwać','otworzyć','zamknąć','kopiować','wkleić','zmienić','zaznaczyć','wyciąć'];
let GermanWordsComputer = ['der Computer','der Drucker','das Touchpad','die Maus','der Bildschrim','die Tastatur','das Passwort','die App','die Datei','spreichern','löschen','öffnen','schließen','kopieren','einfügen','ändern','markieren','ausschneiden'];

let PolishWords = [PolishWordsFamily,PolishWordsAnimals,PolishWordsClothes,PolishWordsLandscape,PolishWordsComputer];
let GermanWords = [GermanWordsFamily,GermanWordsAnimals,GermanWordsClothes,GermanWordsLandscape,GermanWordsComputer];

let divContainerMenu = $('#container-menu');
let divContainerCards = $('#container-cards');
let divContainerGame = $('#container-game');
let divGameOptions = $('#game-options');
let divGameBoard = $('#game-board');
let divGameOptionsCategories = $('#game-options-categories');
let divWinnerScreen = $('#winner-screen');

//ContainerCards fill
function ContainerCardsFill(){
    for (let i = 0; i < PolishCategoriesNames.length; i++) {

        let divGroup = $('<div></div>').attr('class', 'container-cards-group');
        let pCategoryName = $('<p></p>').attr('class', 'container-cards-group-category-name');
        let divGroupPlace = $('<div></div>').attr('class', 'container-cards-group-place');

        pCategoryName.text(PolishCategoriesNames[i]+' / '+GermanCategoriesNames[i]);

        for (let j = 0; j < PolishWords[i].length; j++) {
            let divGroupElement = $('<div></div>').attr('class', 'container-cards-group-place-element');
            let pPolish = $('<p></p>').text(PolishWords[i][j]);
            pPolish.attr('class','card-text');
            let pGerman = $('<p></p>').text(GermanWords[i][j]);
            pGerman.attr('class','card-text');
            divGroupElement.append(pPolish,' = ',pGerman);
            divGroupPlace.append(divGroupElement);
        }

        divGroup.append(pCategoryName,divGroupPlace);
        divContainerCards.append(divGroup);
    }
}
//GameOptions fill
function GameOptionsFill(){
    for (let i = 0; i < PolishCategoriesNames.length; i++) {
        let liCategory = $('<li></li>');
        let pCategoryName = $('<p></p>').text(PolishCategoriesNames[i]);
        let inputCategoryCheckbox = $('<input></input>').attr('type', 'checkbox').attr('CategoryID',i);
        liCategory.append(inputCategoryCheckbox,pCategoryName);
        divGameOptionsCategories.append(liCategory);
    }
    divGameOptions.append(divGameOptionsCategories);
}

//game
function StartGame(){
    divGameBoard.empty();
    let itemsCount = 18;
    divGameOptions.removeClass('display-flex');
    divGameBoard.addClass('display-grid');
    divGameBoard.css('animation','game-start-animation 0.3s');
    let PickedCategoriesArr = PickedCategories();
    let PickedPolishWords = CreateWordsArray(PickedCategoriesArr,PolishWords);
    let PickedGermanWords = CreateWordsArray(PickedCategoriesArr,GermanWords);
    let RandomIndexes = GetRandomIndexes(0,PickedPolishWords.length,itemsCount/2);
    let TempPickedPolishWords = [];
    let TempPickedGermanWords = [];
    for(let i = 0; i<RandomIndexes.length; i++){
        TempPickedPolishWords.push(PickedPolishWords[RandomIndexes[i]]);
        TempPickedGermanWords.push(PickedGermanWords[RandomIndexes[i]]);
    }
    PickedPolishWords=TempPickedPolishWords;
    PickedGermanWords=TempPickedGermanWords;
    GenerateShuffledItems(PickedPolishWords,PickedGermanWords,itemsCount/2);

}

function PickedCategories(){
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var PickedCategories = [];
    checkboxes.forEach(function(checkbox) {
        if(checkbox.checked){
            PickedCategories.push($(checkbox).attr('categoryid'));
        }
    });
    return PickedCategories;
}

function CreateWordsArray(PickedCategories,LangWordsArray){
    WordsArray = [];
    for(let i=0; i<PickedCategories.length;i++){
        WordsArray = WordsArray.concat(LangWordsArray[PickedCategories[i]]);
    }
    return WordsArray;
}

function GetRandomIndexes(min, max, length) {
    let Indexes = [];
    while(Indexes.length!=length){
        let random = GetRandomNumber(min,max);
        if(!Indexes.includes(random)){
            Indexes.push(random);
        }
    }
    return Indexes;
}

function GetRandomNumber(min,max){
    let random = min + Math.floor((max - min) * Math.random());
    return random;
}

function GenerateShuffledItems(PickedPolishWords,PickedGermanWords,itemsCount){
    let NotShuffledItems = [];
    for (let i = 0; i<itemsCount ; i++){
        NotShuffledItems.push(CreateItem(PickedPolishWords[i],i),CreateItem(PickedGermanWords[i],i))
    }
    ShuffleItems(NotShuffledItems);
}

function CreateItem(backWord,i){
    let divGameBoardItem = $('<div></div>').attr('class', 'game-board-item').attr('id',i).attr('onclick','ItemClick(this)');
    let divGameBoardItemTop = $('<span></span>').attr('class', 'game-board-item-top display-flex material-symbols-outlined');
    divGameBoardItemTop.text('question_mark');
    let divGameBoardItemBack = $('<p></p>').attr('class', 'game-board-item-back');
    divGameBoardItemBack.text(backWord);
    divGameBoardItem.append(divGameBoardItemTop,divGameBoardItemBack);
    return divGameBoardItem;
}

function ShuffleItems(NotShuffledItems){
    ShuffledItems = [];
    while(NotShuffledItems.length!=0){
        let random = GetRandomNumber(0,NotShuffledItems.length);
        ShuffledItems.push(NotShuffledItems.splice(random,1));
    }
    ShuffledItems.forEach((item)=>{
        divGameBoard.append(item);
    });
}

function ItemClick(elem){
    $(elem).addClass('picked');
    $(elem).attr('onclick','');
    $(elem).css('animation','rotate-item-01 0.5s forwards');
    setTimeout(() => {
        $(elem).children('.game-board-item-top').removeClass('display-flex');
        $(elem).children('.game-board-item-back').addClass('display-flex'); 
    }, 100);
    if($('.picked').length==2){
        $('.game-board-item').attr('onclick','');
        let pickedArr = document.querySelectorAll('.picked');
        if(pickedArr[0].id==pickedArr[1].id){
            setTimeout(() => {
                PickSuccess(pickedArr);
            }, 1000);
        }else{
            setTimeout(() => {
                PickFail(pickedArr);
            }, 1000);
        }
    }
}

function PickSuccess(ElemArr){
    ElemArr.forEach(elem => {
        $(elem).addClass('disabled');
        $(elem).css('animation','items-fade-out 0.5s forwards');
    });
    if($('.disabled').length==18){
        divGameBoard.removeClass('display-grid');
        divWinnerScreen.addClass('display-flex');
        divWinnerScreen.css('animation','screen-fade-in 0.5s')
    }else{
        ResumeGame();
    }
}

function PickFail(ElemArr){
    ElemArr.forEach(elem => {
        $(elem).css('animation','rotate-item-02 0.5s forwards');
        $(elem).children('.game-board-item-top').addClass('display-flex');
        $(elem).children('.game-board-item-back').removeClass('display-flex'); 
    });
    ResumeGame();
}

function ResumeGame(){
    $('.picked').removeClass('picked');
    $('.game-board-item').attr('onclick','ItemClick(this)');
    $('.disabled').attr('onclick','');
}

//buttons
function CardsOpen(){
    divContainerMenu.removeClass('display-flex');
    divContainerCards.addClass('display-flex');
}

function GameOpen(){
    divGameOptionsCategories.empty();
    GameOptionsFill();
    divContainerMenu.removeClass('display-flex');
    divGameBoard.removeClass('display-grid');
    divContainerGame.addClass('display-flex');
    divGameOptions.addClass('display-flex');
}

function MenuOpen(){
    divContainerCards.removeClass('display-flex');
    divContainerGame.removeClass('display-flex');
    divWinnerScreen.removeClass('display-flex');
    divContainerMenu.addClass('display-flex');
}

function PlayAgain(){
    divWinnerScreen.removeClass('display-flex');
    divGameBoard.removeClass('display-grid');
    divContainerGame.addClass('display-flex');
    divGameOptions.addClass('display-flex');
}

//onload
ContainerCardsFill();
MenuOpen();

setInterval(() => {
    console.log('e');
    var checkboxes = document.querySelectorAll('#game-options-categories li input[type="checkbox"]:checked');
    if(checkboxes.length>0){
        $('#start-game-btn').css('display','block');
    }else{
        $('#start-game-btn').css('display','none');
    }
}, 50);