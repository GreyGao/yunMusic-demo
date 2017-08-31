var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
let id = getParameterByName('id');
let query = new AV.Query('Song');
query.get(id).then(function(results){
    let song = results.attributes;
    let name = song.name;
    let singer = song.singer;
    let img = song.image;
    $("#songCover").attr("src",img);
    $("#songName").text(name);
    $("#songSinger").text(singer);
    $("#songSpace").text(" - ")
    $("#playBg").css('background',`url(${img}) no-repeat`)
        .css('background-position',"50%").css('background-size',"auto 100%")
});



