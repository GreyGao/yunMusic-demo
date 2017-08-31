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
    let url = song.url;
    $("#songCover").attr("src",img);
    $("#songName").text(name);
    $("#songSinger").text(singer);
    $("#songSpace").text(" - ");
    $("#playBg").css('background',`url(${img}) no-repeat`)
        .css('background-position',"50%").css('background-size',"auto 100%");
    $('#songSrc').attr("src",url)
});


// let music = document.getElementById('songSrc');
// let currentTime = music.currentTime;
// let duration = music.duration;
// if(currentTime >= duration){
//     $('.song-img').toggleClass('song-img spin-stop');
//     $('.song-circle').toggleClass('spin-run spin-stop');
//     $('#playButton').removeClass('hide')
// }else{
//     console.log('小')
// }

function musicPlayer() {
    let music = document.createElement('audio');
    music.id="songSrc";
    document.body.appendChild(music);
    music.play();
    if(music.ended){
        $('.song-img').toggleClass('spin-run spin-stop');
        $('.song-circle').toggleClass('spin-run spin-stop');
        $('#playButton').removeClass('hide')
    }

    //暂停功能，还没想好
    $('#playButton').on('click',function () {
        if(music.paused){
            music.play();
            $('.song-img').toggleClass('spin-run spin-stop');
            $('.song-circle').toggleClass('spin-run spin-stop');
        }else if(music.play()){
            music.pause();
            $('.song-img').toggleClass('spin-run spin-stop');
            $('.song-circle').toggleClass('spin-run spin-stop');
        }
    })


}
musicPlayer()