const infoBlock = document.querySelector(".info-block");
function showInfo(catData) {
    infoBlock.classList.add("active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${catData.img_link}" alt="${catData.name}">
        <div class="information">
            <h2>${catData.name}</h2>
            <h3>${catData.age} ${buildYearDescription(catData.age)}</h3>
            <p>${catData.description}</p>
            <div class="information-action-buttons-block">
                <button class="icon-button" title="Удалить котика" onclick="onDeleteCat(${catData.id})">
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        
        <div class="info-close" onclick="closeInfo()"></div>
    `;
}

function closeInfo() {
    infoBlock.classList.remove("active");
}

const main = document.querySelector("main");
function getItem(catData) {
    const item = `
        <div class="card">
            <div class="card-img" style="background-image: url(${catData.img_link})"></div>
            <h3>${catData.name}</h3>
            <p class="rate">${renderRate(catData.rate)}</p>
        </div>
    `
    main.innerHTML += item;
}

let catsData = [];

async function init() {
    const currentData = localStorage.getItem('catsData');
    if (!currentData) {
        const catsResponse = await fetch('https://sb-cats.herokuapp.com/api/show');
        const catsResponseJson = await catsResponse.json();
        cats = catsResponseJson.data.filter(x => !!x.id);

        localStorage.setItem('catsData', JSON.stringify(cats));
        catsData = cats;
    } else {
        catsData = JSON.parse(currentData);
    }
    catsData.forEach(catData => {
        getItem(catData);
    });

    const cards = document.getElementsByClassName("card");
    for (let index = 0; index < cards.length; index++) {
        cards[index].addEventListener("click", function () {
            showInfo(catsData[index]);
        })
    }
}

init();

function renderRate(rateValue) {
    const fill = "<img src='assets/cat-fill.svg' alt='^_^'>"
    const stroke = "<img src='assets/cat-stroke.svg' alt='O_o'>"
    let rate = "";
    const count = 10;
    for (let index = 0; index < count; index++) {
        rate += index < rateValue ? fill : stroke;
    }
    return rate;
}

function buildYearDescription(n, year1 = 'год', year2 = 'года', year3 = 'лет') {
    if (!(n % 100 < 11 || n % 100 > 14)) {
        return year3;
    }

    if (n % 10 === 1) {
        return year1;
    } else if (n % 10 >= 2 && n % 10 <= 4) {
        return year2;
    } else {
        return year3;
    }
}

function refreshCats() {
    catsData = [];
    main.innerHTML = '';
    localStorage.removeItem('catsData');
    init();
}

async function onDeleteCat(id) {
    const result = await fetch(`https://sb-cats.herokuapp.com/api/delete/${id}`, {
        method: 'DELETE'
    });
    if (result.ok) {
        refreshCats();
        closeInfo();
    }
}
