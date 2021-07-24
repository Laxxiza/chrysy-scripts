let start = document.getElementById("date_start").value;
let end = document.getElementById("date_end").value;
let user_id = '116189';
$.ajax({
    type: 'GET',
    url: '/api/v2/get_all_bo?add_day=1&zero_bo=0&start=' + start + '&end=' + end + '&user_id=' + user_id,
    dataType: 'json',
    success: function (data) {
        setTimeout(function () {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].count);
            }
            console.log(data);
        }, 500)
    }
});

let new_card_line = document.createElement('section'); //`<section class="indicator-cards mb-2 pb-3"></section>`;
new_card_line.className = "indicator-cards mb-2 pb-3";
let card = `<div class="indicator-card-big">
                <div class="card mb-0">
                    <div class="card-body card-body-bg-green">
                        <div class="title-item">Новое</div>
                        <div class="mb-2">тестовое</div>
                        <div class="bo-count">поле</div>
                    </div>
                </div>
            </div>`;

let testCard = `<div class="indicator-card-big">
                    <div class="card bg-primary mb-0">
                        <div class="card-body card-body-bg">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Cras justo odio</li>
                                <li class="list-group-item">Dapibus ac facilisis in</li>
                                <li class="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
//`<div class="indicator-card-big"></div>`
new_card_line.innerHTML += card;
//new_card_line.innerHTML += testCard;
let posline = document.querySelector("body > div.container-fluid > div > main > div.row > div:nth-child(1) > section:nth-of-type(2)");
posline.after(new_card_line);
console.log(new_card_line);