function etrRgx({findPath, findValue}, text) {
    const str = text;
    if(str.match(findPath) && str.match(findValue)){
        let result = str.match(findPath)[0];
        result = result.match(findValue);
        return result.join(',');
    }
    return "";
}

function map(event) {
    const findPath = /\([^\(]+(poi|home)[^\)]*\)/mi;
    const findValue = /\d+\.\d+/gmi;
    const yaMapUrl = `https://maps.yandex.ru/?mode=search&text=`;
    const text = event.target.innerText;
    const cordMap = etrRgx({findPath, findValue}, text);

    if (cordMap) {
        console.log('%c%s', 'font: bold 2em/1 Arial; color: green', 'Координаты найдены');
        window.open(yaMapUrl + cordMap);
    }
    else console.log('%c%s', 'font: bold 2em/1 Arial; color: red', 'Координаты не найдены');
}

$(document).ready(function(){
    console.log("123");
    $(document).on('click', 'td.trim', map);
});
