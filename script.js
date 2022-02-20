const catsData = [
    {
        "id": 1,
        "name": "Лара",
        "age": 8,
        "rate": 7,
        "description": "Лара – шотландская вислоухая, у нее остеохондродисплазия. Лара спокойная, очень ласковая и контактная. Болезнь не лечится и специального ухода не нужно.",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2021-09/167200DD-A44F-4845-8D4D-ACCFC180165A.jpeg",
    },
    {
        "id": 2,
        "name": "Базиль",
        "age": 2,
        "rate": 10,
        "description": "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
    },
    {
        "id": 3,
        "name": "Риш",
        "age": 1,
        "rate": 10,
        "description": "Риш любит лесенки, канаты. Очень активный и дружелюбный кот. Риш полностью здоров, привит, кастрирован. Использует лоточек и очень аккуратен.",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/_DM34706.JPG",
    },
    {
        "id": 4,
        "name": "Элли",
        "age": 4,
        "rate": 8,
        "description": "Элли обладает мягким и добрым характером. Очень любит всевозможные лакомства и вкусно покушать. Не доверяет людям, потребуется время, чтобы стать ей другом. Приучена к лотку и когтеточке",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/1_25.jpg",
    },
    {
        "id": 5,
        "name": "Чарли",
        "age": 1,
        "rate": 8,
        "description": "Чёрно-белый юный котофилософ очень любит размышлять и быть наедине. Пока что не доверяет людям, не агрессивный. Ладит с другими животными, приучен к лотку и когтеточке",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D0%BB%D0%B5%D0%B2%D0%B83_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
    },
    {
        "id": 6,
        "name": "Стефани",
        "age": 6,
        "rate": 9,
        "description": "Прелестная Стефани – трогательная, добродушная и очень-очень общительная девочка как никто другой нуждается в заботе и любви. Приучена к лотку и когтеточке",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/4_30.jpg",
    },
    {
        "id": 7,
        "name": "Дуся",
        "age": 1,
        "rate": 9,
        "description": "Дусеньке около 1 года с небольшим, здорова, привита, стерилизована. Лоточек и когтеточку знает прекрасно. Очень общительная и нежная, хочет постоянного внимания.",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-02/B1444207-6EE3-4BA4-97F7-2F9666AE2F63.jpeg",
    },
    {
        "id": 8,
        "name": "Бруно",
        "age": 1,
        "rate": 10,
        "description": "Очаровательный активный кот Бруно, находится в постоянном движении! Очаровательный и ласковый кот. Приучен к лотку, ладит с другими котами, привит.",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/IMG-20211223-WA0049.jpg",
    },
    {
        "id": 9,
        "name": "Лара",
        "age": 1,
        "rate": 9,
        "description": "Немного боязливый, но очень добрый и нежный кот Светлячок. Приучен к лотку и когтеточке, ладит с детьми, привит. Станет вам хорошим другом",
        "imageSource": "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D1%8F%D1%87%D0%BE%D0%BA4_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
    }
];

const infoBlock = document.querySelector(".info-block");
function showInfo(catData) {
    infoBlock.classList.add("active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${catData.imageSource}" alt="${catData.name}">
        <div class="information">
            <h2>${catData.name}</h2>
            <h3>${catData.age} ${buildYearDescription(catData.age)}</h3>
            <p>${catData.description}</p>
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
            <div class="card-img" style="background-image: url(${catData.imageSource})"></div>
            <h3>${catData.name}</h3>
            <p class="rate">${renderRate(catData.rate)}</p>
        </div>
    `
    main.innerHTML += item;
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
