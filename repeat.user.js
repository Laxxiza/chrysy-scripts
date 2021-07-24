const NOT_FOUND = 500;
const NOTNOT_FOUND = 10000;

function getToken() {
  console.log("get token");
  let token;
  $.ajax({
    async: false,
    type: 'POST',
    url: 'https://supchat.taxi.yandex-team.ru/chatterbox-api/me/',
    dataType: 'json',
    success: function (data) {
      token = data.csrf_token;
    }
  });
  return token;
}

function getLines() {
  console.log("get lines");
  let lines;
  $.ajax({
    async: false,
    type: 'GET',
    url: 'https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/user/status/',
    dataType: 'json',
    success: function (data) {
      lines = data.lines;
    }
  });
  return lines;
}

function clickBut(button) {
  button.click();
}

function getTicks(button) {
  console.log("start butclick func");
  let token = getToken();
  let lines = {lines: getLines()};
  let enter = setInterval(async function () {
    if (button && token) {
      console.log("Click!");
      $.ajax({
        async: false,
        type: 'POST',
        headers: { 'X-CSRF-TOKEN': token },
        url: 'https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/take/',
        data: JSON.stringify(lines),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          console.log(data);
          clearInterval(enter);
          refresh();
          button[0].click();
        },
        error: function (jq, status, message) {
          console.log(status, message);
        }
      });
    }
  }, NOT_FOUND);
}

function refresh() {
  let find = setInterval(function () {
    console.log("Wait a will appear button");
    let headlineErr = document.getElementsByClassName('amber-typography__headline');//('amber-typography__headline');

    if (headlineErr.length > 0 && headlineErr[0].innerText == "404 not_found") {
      let but = document.getElementsByClassName('amber-button amber-button_theme_accent amber-button_size_m');
      getTicks(but);
      console.log(but);
      clearInterval(find);
    }
    else {
      console.log("Не то уведомление");
    }
  }, NOTNOT_FOUND)
};

refresh();

// fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/take/", {
//   "headers": {
//     "accept": "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "ru,en;q=0.9",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Yandex\";v=\"91\", \"Chromium\";v=\"91\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-csrf-token": "null",
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": "https://supchat.taxi.yandex-team.ru/main/offline",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "lines%5B%5D=taxi_driver_account_exp&lines%5B%5D=taxi_partner_driver_vaccination&lines%5B%5D=driver_account",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

// $.ajax({
//   type: 'POST',
//   headers: { 'X-CSRF-TOKEN': getCookie('csrf_cmpd') },
//   url: 'https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/take/',
//   data: { "lines": ["taxi_driver_account_exp", "taxi_partner_driver_vaccination", "driver_account"] },
//   dataType: 'json',
//   success: function (data) {
//     console.log(data);
//     clearInterval(enter);
//     refresh();
//   }
// });

// fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/me/", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru,en;q=0.9",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Yandex\";v=\"91\", \"Chromium\";v=\"91\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://supchat.taxi.yandex-team.ru/chat/60e156ac583ca7894acacf78",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

//getCookie('csrf_cmpd')

// fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/take/", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru,en;q=0.9",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Yandex\";v=\"91\", \"Chromium\";v=\"91\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-csrf-token": "4afce8d522d10dc17d6141f861ef435d66ffcbc6:1626142819"
//   },
//   "referrer": "https://supchat.taxi.yandex-team.ru/main/offline",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"lines\":[\"taxi_driver_account_exp\",\"taxi_partner_driver_vaccination\",\"driver_account\"]}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });

// fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/tasks/take/", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru,en;q=0.9",
//     "content-type": "application/json;charset=UTF-8",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Yandex\";v=\"91\", \"Chromium\";v=\"91\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-csrf-token": "377f432b27cebb3df53cad95c1cb9fb24b5ffd09:1626156777"
//   },
//   "referrer": "https://supchat.taxi.yandex-team.ru/main/offline",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"lines\":[\"taxi_driver_account_exp\",\"taxi_partner_driver_vaccination\",\"driver_account\"]}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// }).then((response) => {
//   console.log(response.ok);
// }).then((data) => {
//   console.log(data);
// });

// fetch("https://supchat.taxi.yandex-team.ru/chatterbox-api/v1/user/status/", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "ru,en;q=0.9",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Yandex\";v=\"91\", \"Chromium\";v=\"91\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://supchat.taxi.yandex-team.ru/main/offline",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// });