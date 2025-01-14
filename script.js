// CATCH ELEMENTS
const btnMore = document.querySelector(".btn-more");
const cardsContainer = document.querySelector(".cards");
const cards = document.querySelectorAll(".card");
const search = document.querySelector(".search");
const basket = document.querySelector(".basket");
const overlay = document.querySelector(".overlay");
const overlay2 = document.querySelector(".overlay2");
const overlay3 = document.querySelector(".overlay3");
const content = document.querySelector(".content");
const contentForCards = document.querySelector(".cards-container");
const contentForCards2 = document.querySelector(".cards-favourite-container");
const content2 = document.querySelector(".content2");
const content3 = document.querySelector(".content3");
const signIn = document.querySelector("#sign-in");
const faveBtn = document.querySelector("#favourite");
const form = document.querySelector(".sign-in-form");

const users = [
    {
        name: 'Diana',
        password: '555'
    },
    {
        name: 'Alex',
        password: 'qwerty'
    },
];

// VARIABLES
let i = 0;
let j = localStorage.faveCounter ? localStorage.faveCounter : 0;
let isLogIn = false;

// STORAGE CHECK
if (localStorage.basketCounter) {
    basket.innerHTML = localStorage.basketCounter;
    i = localStorage.basketCounter;
}

if (localStorage.cards) {
    contentForCards.innerHTML = localStorage.cards;
}

if (localStorage.faveCards) {
    contentForCards2.innerHTML = localStorage.faveCards;
}

if (localStorage.isLogIn) {
    isLogIn = localStorage.isLogIn;
    checkLogIn();
}

// CATCH CLEAR BUTTONS
const clear = document.querySelector("#btn-clear");
const clearFave = document.querySelector("#btn-clear-favourite");

// SET LOGIC FOR BASCKET & FAVOURITES
cards.forEach(function (card) {
    const buySpan = card.querySelector(".price");
    const faveSpan = card.querySelector(".fave");

    buySpan.addEventListener("click", function () {
        i++;
        localStorage.basketCounter = i;
        basket.innerHTML = i;
        addCardToBasket(card);
        saveCardToStorage();
    });

    faveSpan.addEventListener("click", function () {
        j++;
        localStorage.faveCounter = j;
        addCardToFave(card);
        saveFaveCardToStorage();
    });
});

basket.addEventListener("click", function () {
    overlay.classList.add("active");
});

signIn.addEventListener("click", function () {
    overlay2.classList.add("active");
});

faveBtn.addEventListener("click", function () {
    overlay3.classList.add("active");
});

clear.addEventListener("click", () => {
    localStorage.removeItem("basketCounter");
    localStorage.removeItem("cards");
    contentForCards.innerHTML = '';
    content.querySelector("h2").style.display = 'block';
    basket.innerHTML = '0';
    i = 0;
});

clearFave.addEventListener("click", () => {
    localStorage.removeItem("faveCounter");
    localStorage.removeItem("faveCards");
    contentForCards2.innerHTML = '';
    content3.querySelector("h2").style.display = 'block';
    content3.querySelector("button").style.display = 'none';
    j = 0;
});

function addCardToBasket(card) {
    const cloneOfCard = card.cloneNode(true);
    contentForCards.append(cloneOfCard);

    if (localStorage.basketCounter >= 1) {
        content.querySelector("h2").style.display = 'none';
        content.querySelector("button").style.display = 'block';
    }
}

function addCardToFave(card) {
    const cloneOfCard = card.cloneNode(true);
    contentForCards2.append(cloneOfCard);

    if (localStorage.faveCounter >= 1) {
        content3.querySelector("h2").style.display = 'none';
        content3.querySelector("button").style.display = 'block';
    }
}

function saveCardToStorage() {
    localStorage.cards = content.innerHTML;
}

function saveFaveCardToStorage() {
    localStorage.faveCards = content3.innerHTML;
}

// SET LOGIC FOR POP-UPS
overlay.addEventListener("click", function () {
    overlay.classList.remove("active");
});

overlay2.addEventListener("click", function () {
    overlay2.classList.remove("active");
});

overlay3.addEventListener("click", function () {
    overlay3.classList.remove("active");
});

content.addEventListener("click", function (e) {
    e.stopPropagation();
});

content2.addEventListener("click", function (e) {
    e.stopPropagation();
});

content3.addEventListener("click", function (e) {
    e.stopPropagation();
});

btnMore.addEventListener("click", function() {
    cardsContainer.classList.toggle("open");
});

// SET LOGIC FOR SEARCH INPUT
search.addEventListener("input", function () {
    let found = false;

    cards.forEach(function (card) {
        card.style.display = 'none';
        const title = card.querySelector("h4").innerHTML;

        if (title.toLowerCase().includes(search.value.toLowerCase())) {
            card.style.display = 'block';
            found = true;
        }
    });

    if (!found) {
        document.querySelector('.error').style.display = 'block';
    } else {
        document.querySelector('.error').style.display = 'none';
    }
});

// MATCH SEARCH
form.addEventListener("submit", (e) => {
    e.preventDefault();

    for (let i = 0; i < users.length; i++) {
        if (users[i].name === form.login.value && users[i].password === form.password.value) {
            isLogIn = true;
            localStorage.isLogIn = isLogIn;
            checkLogIn();
            overlay2.classList.remove("active");
            break;
        } else {
            isLogIn = false;
        }
    }
});


function checkLogIn() {
    if (isLogIn) {
        faveBtn.style.display = 'block';
        signIn.style.display = 'none';
    }
}

// VALIDATE LOGIN
form.login.addEventListener("input", () => {
    // ^[a-zA-Z]{1}\\w{0,}$
    let reg = new RegExp("^[a-zA-Z]+\\w*$");
    if (reg.test(form.login.value)) {
        form.login.style.backgroundColor = 'lightgreen';
    } else {
        form.login.style.backgroundColor = 'lightcoral';
    }
});

// VALIDATE PASSWORD
form.password.addEventListener("input", () => {
    let reg = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d_]{8,}$");
    if (reg.test(form.password.value)) {
        form.password.style.backgroundColor = 'lightgreen';
    } else {
        form.password.style.backgroundColor = 'lightcoral';
    }
});
