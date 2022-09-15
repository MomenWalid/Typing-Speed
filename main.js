// const words = [
//     "Hello",
//     "Programming",
//     "Code",
//     "Javascript",
//     "Town",
//     "Country",
//     "Testing",
//     "Youtube",
//     "Linkedin",
//     "Twitter",
//     "Github",
//     "Leetcode",
//     "Internet",
//     "Python",
//     "Scala",
//     "Destructuring",
//     "Paradigm",
//     "Styling",
//     "Cascade",
//     "Documentation",
//     "Coding",
//     "Funny",
//     "Working",
//     "Dependencies",
//     "Task",
//     "Runner",
//     "Roles",
//     "Test",
//     "Rust",
//     "Playing",
// ];

const arrayOfWords = {
    Esay: [
        "Town",
        "Task",
        "Runner",
        "Roles",
        "Test",
        "Rust",
        "Cat",
        "Dog",
        "Fox",
        "Trust",
        "One",
        "Big",
        "Fat",
        "Jump",
        "Play",
        "Go",
        "Super",
        "More",
        "Mili",
        "Many",
    ],
    Normal: [
        "Second",
        "Menites",
        "Playing",
        "People",
        "Paradigm",
        "Styling",
        "Cascade",
        "Testing",
        "Youtube",
        "Linkedin",
        "Twitter",
        "Github",
        "Leetcode",
        "Internet",
        "Python",
        "Scala",
        "Country",
        "Circle",
        "Gone",
        "Room",
    ],
    Hard: [
        "Dependencies",
        "Documentation",
        "Destructuring",
        "Programming",
        "Javascript",
        "Soccer",
        "Weapon",
        "Jungle",
        "America",
        "England",
        "Elephant",
        "Giraffe",
        "cocacola",
        "Surprise",
        "Football",
        "Windows",
        "Window",
        "Pregnant",
        "mosquito",
        "Argentine",
    ],
};

// Setting Levels
const lvls = {
    Easy: 5,
    Normal: 4,
    Hard: 3,
};

// Default Values
let defaultLevelName;
let defaultLevelSeconds;
let words;

let select = document.getElementById("dropdown");

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

let instruction = document.querySelector(".instruction");

select.onchange = function() {
    if (this.selectedIndex == "1") {
        defaultLevelName = "Easy";

        words = arrayOfWords.Esay;
    } else if (this.selectedIndex == "2") {
        defaultLevelName = "Normal";

        words = arrayOfWords.Normal;
    } else if (this.selectedIndex == "3") {
        defaultLevelName = "Hard";

        words = arrayOfWords.Hard;
    }

    defaultLevelSeconds = lvls[defaultLevelName];

    if (
        this.selectedIndex == "1" ||
        this.selectedIndex == "2" ||
        this.selectedIndex == "3"
    ) {
        startButton.onclick = function() {
            this.remove();
            input.focus();

            genWords();
        };
    }

    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
};

// Disable Paste Event
input.onpaste = function() {
    return false;
};

function genWords() {
    let randomWord = words[Math.floor(Math.random() * words.length)];

    let wordIndex = words.indexOf(randomWord);

    words.splice(wordIndex, 1);

    theWord.innerHTML = randomWord;

    upcomingWords.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");

        let txt = document.createTextNode(words[i]);

        div.appendChild(txt);

        upcomingWords.appendChild(div);
    }

    // Add 3 Seconds For First Word
    if (scoreGot.innerHTML == "0") {
        defaultLevelSeconds += 3;
    } else {
        defaultLevelSeconds = lvls[defaultLevelName];
    }

    // START play function

    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    let start = setInterval(function() {
        timeLeftSpan.innerHTML--;

        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);

            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                scoreGot.innerHTML++;

                input.value = "";

                if (words.length > 0) {
                    genWords();
                } else {
                    let span = document.createElement("span");

                    span.className = "good";

                    let txt = document.createTextNode("You Done It");

                    span.appendChild(txt);
                    finishMessage.appendChild(span);

                    document.body.style.pointerEvents = "none";

                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement("span");

                span.className = "bad";

                let txt = document.createTextNode("Game Over");

                span.appendChild(txt);
                finishMessage.appendChild(span);
                document.body.style.pointerEvents = "none";
            }
        }
    }, 1000);
}

function instructions() {
    let ul = document.createElement("ul");
    let text1 = document.createTextNode("1- You Have To Select Your Level");
    ul.appendChild(text1);
    instruction.appendChild(ul);

    let li1 = document.createElement("li");

    li1.innerHTML = `If You Select <span> Easy </span> You Will Play On <span> ${lvls.Easy} </span> Seconds`;

    ul.appendChild(li1);

    let li2 = document.createElement("li");

    li2.innerHTML = `If You Select <span> Normal </span> You Will Play On <span> ${lvls.Normal} </span> Seconds`;

    ul.appendChild(li2);

    let li3 = document.createElement("li");

    li3.innerHTML = `If You Select <span> Hard </span> You Will Play On <span> ${lvls.Hard} </span> Seconds`;

    ul.appendChild(li3);

    let div = document.createElement("div");
    div.innerHTML = "2- Click on <span> Start Playing </span>";
    instruction.appendChild(div);

    let div0 = document.createElement("div");
    div0.innerHTML =
        "3- You Have <span> 3 More Seconds </span> For The First Word";
    instruction.appendChild(div0);

    let div1 = document.createElement("div");
    div1.innerHTML = "4- You Will have A Random Word Yo Type It";
    instruction.appendChild(div1);

    let div2 = document.createElement("div");
    div2.innerHTML =
        "5- If You Write The Word In The Specific Time. You <span> Win </span> And Continue The Game";
    instruction.appendChild(div2);

    let div3 = document.createElement("div");
    div3.innerHTML =
        "6- If You  Dont Write  The Word In The Specific Time. You <span style = 'color : red'> Lose </span> The Game";

    instruction.appendChild(div3);

    let div4 = document.createElement("div");
    div4.innerHTML =
        "7- If You <span> Finish </span> All Words You <span> Win </span> The Game";
    instruction.appendChild(div4);
}

instructions();