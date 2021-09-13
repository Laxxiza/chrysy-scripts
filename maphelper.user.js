function etrRgx(rgx, text) {
    const str = text;
    if(str.match(rgx.regPath) && str.match(rgx.regValue)){
        let result = str.match(rgx.regPath)[0];
        result = result.match(rgx.regValue);
        return result.join(',');
    }
    return "";
}

function map(event) {   
    const yaMapUrl = `https://maps.yandex.ru/?mode=search&text=`;
    const text = event.target.innerText;
    
    const findMode = ["poi", "home", "MyDistrict", "Airport"];
    const findPath = `\([^\(]+(${findMode.join("|")})[^\)]*\)`;//mi;
    console.log(findPath);
    const findValue = `\d+\.\d+`;//gmi;
    const regPath = new RegExp( findPath, 'mi' );
    const regValue = new RegExp( findValue, 'gmi' );
    
    const cordMap = etrRgx({regPath, regValue}, text);

    if (cordMap) {
        console.log('%c%s', 'font: bold 2em/1 Arial; color: green', 'Координаты найдены');
        window.open(yaMapUrl + cordMap);
    }
    else console.log('%c%s', 'font: bold 2em/1 Arial; color: red', 'Координаты не найдены');
}

$(document).ready(function(){
    $(document).on('click', 'td.trim', map);
});
