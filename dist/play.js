'use strict';

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
var id = getParameterByName('id');
var query = new AV.Query('Song');
query.get(id).then(function (results) {
    var song = results.attributes;
    var name = song.name;
    var singer = song.singer;
    var img = song.image;
    var url = song.url;
    var lyric = song.lyric;
    $('title').html(name + '-' + singer + '-\u5728\u7EBF\u8BD5\u542C');
    $("#songCover").attr("src", img);
    $("#songName").text(name);
    $("#songSinger").text(singer);
    $("#songSpace").text(" - ");
    $("#playBg").css('background', 'url(' + img + ') no-repeat').css('background-position', "50%").css('background-size', "auto 100%");
    $('#songSrc').attr("src", url);

    parseLyric(lyric);
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
    var music = document.createElement('audio');
    music.id = "songSrc";
    document.body.appendChild(music);
    music.play();

    //暂停功能，还没想好
    $('#playButton').on('click', function () {
        if (music.paused) {
            music.play();
            $('.song-img').toggleClass('spin-run spin-stop');
            $('.song-circle').toggleClass('spin-run spin-stop');
            $('#songPin').toggleClass('pin-stop');
        } else if (music.play()) {
            music.pause();
            $('.song-img').toggleClass('spin-run spin-stop');
            $('.song-circle').toggleClass('spin-run spin-stop');
            $('#songPin').toggleClass('pin-stop');
        }
    });
    music.addEventListener('ended', function () {
        $('.song-img').toggleClass('spin-run spin-stop');
        $('.song-circle').toggleClass('spin-run spin-stop');
        $('#playButton').removeClass('hide');
        $('#songPin').toggleClass('pin-stop');
    });
    setInterval(function () {
        var seconds = music.currentTime;
        var munites = ~~(seconds / 60);
        var left = seconds - munites * 60;
        var time = pad(munites) + ':' + pad(left);
        var $lines = $('.lines >p');
        var $whichLine = void 0;
        for (var i = 0; i < $lines.length; i++) {
            var currentLineTime = $lines.eq(i).attr('data-time');
            var nextLineTime = $lines.eq(i + 1).attr('data-time');
            if ($lines.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
                $whichLine = $lines.eq(i);
            }
        }
        if ($whichLine) {
            $whichLine.addClass('active').prev().removeClass('active');
            var top = $whichLine.offset().top;
            var linesTop = $('.lines').offset().top;
            var delta = Math.floor(top - linesTop - $('.song-lyric').height() / 3);
            $('.lines').css('transform', 'translateY(-' + delta + 'px)');
        }
    }, 300);
}

function parseLyric(lyric) {
    var array = lyric.split('\n');
    var regex = /^\[(.+)\](.*)$/;
    array = array.map(function (string, index) {
        var matches = string.match(regex);
        if (matches) {
            return { time: matches[1], words: matches[2] };
        }
    });
    var $lyriclines = $('.lines');
    array.map(function (object) {
        if (!object) {
            return;
        }
        var $p = $('<p/>');
        $p.attr('data-time', object.time).text(object.words);
        $lyriclines.append($p);
    });
}

function pad(number) {
    return number >= 10 ? number + '' : '0' + number;
}
musicPlayer();

