const infoBlock = document.querySelector(".info-block");
function showInfo(catData) {
    infoBlock.classList.add("active");
    infoBlock.innerHTML = `
        <div class="info-wrapper">
            <img class="info-img" src="${catData.img_link}" alt="${catData.name}">
            <div class="information">
                <h2>${catData.name}</h2>
                <h3>${catData.age} ${buildYearDescription(catData.age)}</h3>
                <p>${catData.description}</p>
                <div class="information-action-buttons-block">
                    <button class="icon-button" title="Редактировать котика" onclick="showEditCatForm(${catData.id})">
                        <i class="fa fa-edit fa-lg" aria-hidden="true"></i>
                    </button>
                    <button class="icon-button" title="Удалить котика" onclick="onDeleteCat(${catData.id})">
                        <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            
            <div class="info-close" onclick="closeInfo()"></div>
        </div>
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
    const shouldDeleteCat = confirm('Удалить котика?');
    if (!shouldDeleteCat) {
        return;
    }
    const result = await fetch(`https://sb-cats.herokuapp.com/api/delete/${id}`, {
        method: 'DELETE'
    });
    if (result.ok) {
        refreshCats();
        closeInfo();
    }
}

function onEditCat(id) {
    console.log(id);
}

function showAddCatForm() {
    infoBlock.classList.add("active");
    infoBlock.innerHTML = `
        <div class="form__container">
            <h2>Добавить котика</h2>
            <div class="info-close" onclick="closeInfo();return false;"></div>
            <form id="cat-form" onsubmit="onAddCat(this)">
                <div class="form__group">
                    <label for="name">Имя котика</label>
                    <input type="text" id="name">
                </div>
                <div class="form__group">
                    <label for="age">Возраст</label>
                    <input type="text" id="age">
                </div>
                <div class="form__group">
                    <label for="rate">Рейтинг</label>
                    <input type="text" id="rate">
                </div>
                <div class="form__group">
                    <label for="description">Описание</label>
                    <input type="text" id="description">
                </div>
                <div class="form__group">
                    <label for="img_link">Ссылка на фото</label>
                    <input type="text" id="img_link">
                </div>

                <button class="form__submit" type="submit">
                    Добавить
                    <i class="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    `;

    const catForm = document.querySelector('#cat-form');
    catForm.onsubmit = onAddCat;
}

async function onAddCat(e) {
    e.preventDefault();

    const state = buildFormState(e.currentTarget);

    const idsResponse = await fetch('https://sb-cats.herokuapp.com/api/ids');
    const jsonIds = await idsResponse.json();
    const maxId = Array.from(jsonIds.data).filter(x => !!x).reduce((acc, cur) => acc > cur ? arr : cur, 0);

    const body = JSON.stringify({
        ...state,
        favourite: false,
        __v: 0,
        id: maxId + 1
    });

    await fetch('https://sb-cats.herokuapp.com/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    });
    closeInfo();
    refreshCats();
}

function showEditCatForm(id) {
    const cat = catsData.find(x => x.id === id);

    infoBlock.classList.add("active");
    infoBlock.innerHTML = `
        <div class="form__container">
            <h2>Добавить котика</h2>
            <div class="info-close" onclick="closeInfo();return false;"></div>
            <form id="cat-form" onsubmit="onAddCat(this)">
                <div class="form__group">
                    <label for="name">Имя котика</label>
                    <input type="text" id="name" value=${cat.name}>
                </div>
                <div class="form__group">
                    <label for="age">Возраст</label>
                    <input type="text" id="age" value=${cat.age}>
                </div>
                <div class="form__group">
                    <label for="rate">Рейтинг</label>
                    <input type="text" id="rate" value=${cat.rate}>
                </div>
                <div class="form__group">
                    <label for="description">Описание</label>
                    <input type="text" id="description" value=${cat.description}>
                </div>
                <div class="form__group">
                    <label for="img_link">Ссылка на фото</label>
                    <input type="text" id="img_link" value=${cat.img_link}>
                </div>
                <input type="text" id="id" value=${cat.id} hidden>

                <button class="form__submit" type="submit">
                    Обновить
                    <i class="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    `;

    const catForm = document.querySelector('#cat-form');
    catForm.onsubmit = onEditCat;
}

async function onEditCat(e) {
    e.preventDefault();

    const state = buildFormState(e.currentTarget);

    const cat = catsData.find(x => x.id === state.id);

    const body = JSON.stringify({
        ...cat,
        ...state
    });

    await fetch(`https://sb-cats.herokuapp.com/api/update/${state.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    });

    closeInfo();
    refreshCats();
}

function buildFormState(target) {
    const elements = Array.from(target);

    const state = elements.reduce((acc, el) => {
        if (el.id) {
            acc[el.id] = el.value;
        }

        return acc;
    }, {});

    return state;
}
