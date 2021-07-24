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
