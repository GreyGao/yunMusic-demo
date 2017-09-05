'use strict';

//主页面Tabs切换
$('.tabs').on('click', '.tabs-main', function (e) {
    var $li = $(e.currentTarget);
    var index = $li.index();
    pageGo(index);
});

function pageGo(index) {
    $('.tabs-main').eq(index).addClass('active').siblings().removeClass('active');
    $('.mainPage').eq(index).addClass('active').siblings().removeClass('active');
}

// leanCloud 初始化
var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// 歌单列表获取
var newSongsList = document.querySelector('#newSongsList');
var hotSongsList = document.querySelector('#hotSongsList');
var query = new AV.Query('Song');
query.find().then(function (results) {
    $('#loading-music').remove();
    for (var i = 0; i < results.length; i++) {
        var song = results[i].attributes;
        var li = '<a href=/yunMusic-demo/play.html?id=' + results[i].id + ' class="songInfo">\n                    <p class="songTitle">' + song.name + '<span class="songDesc">' + song.des + '</span></p>\n                    <p class="singer"><i class="icon icon-sq"></i>' + song.singer + ' - ' + song.album + '</p>\n                    <div class="playButton"><i class="icon icon-play"></i></div>\n             </a>';
        newSongsList.insertAdjacentHTML('beforeend', li);
        hotSongsList.insertAdjacentHTML('beforeend', li);
    }
}, function (error) {
    alert('获取歌曲失败');
    alert(error);
});

// 歌曲搜索
var resultList = document.querySelector('#resultList');
$('input#searchSong').bind('input', function (e) {
    inputChange(e);
}).bind('focus', function (e) {
    inputChange(e);
}).bind('keypress', function (e) {
    searchSubmit(e);
});

$('#hotSearchList').on('click', 'li', function (e) {
    hotSongLink(e);
});

var timer = null;

function inputChange(e) {
    $('.resultMatch').addClass('hide');
    $('#searchResults').addClass('hide');
    $('#search-holder').text('');
    $('#searchEmpty').removeClass('hide');
    if (timer) {
        window.clearTimeout(timer);
    }
    timer = setTimeout(function () {
        timer = null;
        var $input = $(e.currentTarget);
        var value = $input.val();
        var nameQuery = new AV.Query('Song');
        nameQuery.contains('name', value);
        var singerQuery = new AV.Query('Song');
        singerQuery.contains('singer', value);
        var albumQuery = new AV.Query('Song');
        albumQuery.contains('album', value);
        var desQuery = new AV.Query('Song');
        desQuery.contains('des', value);
        var query = AV.Query.or(nameQuery, singerQuery, albumQuery, desQuery);
        if (value.length === 0) {
            $('#search-holder').text('搜索歌曲、歌手、专辑');
            $('#searchTips').removeClass('hide');
            $('#searchEmpty').addClass('hide');
        } else {
            $('#searchResults').removeClass('hide');
            $('#searchLink').text('\u641C\u7D22"' + value + '"');
            $('#searchTips').addClass('hide');
            $('#resultList').empty();

            query.find().then(function (results) {
                $('#resultList').empty();
                if (results.length === 0) {
                    var li = '\n                <a class="resultSong"><i class="svg svg-search"></i><span>\u6CA1\u6709\u7ED3\u679C</span></a>\n                ';
                    resultList.insertAdjacentHTML('beforeend', li);
                } else {
                    for (var i = 0; i < results.length; i++) {
                        var song = results[i].attributes;
                        var _li = '\n                <a href=/yunMusic-demo/play.html?id=' + results[i].id + ' class="resultSong"><i class="svg svg-search"></i><span>' + song.name + ' - ' + song.singer + '</span></a>\n                ';
                        resultList.insertAdjacentHTML('beforeend', _li);
                    }
                }
            });
        }
    }, 350);
}

function hotSongLink(e) {
    var $li = $(e.currentTarget);
    var value = $li.text().trim();
    matchSongList(value);
}

function searchSubmit(e) {
    var $input = $(e.currentTarget);
    var value = $input.val();
    matchSongList(value);
    $('#searchResults').addClass('hide');
}

function matchSongList(value) {
    if (value.length != 0) {
        $('.resultMatch').removeClass('hide');
        $('#searchTips').addClass('hide');
        var _matchSongList = document.querySelector('#matchSongList');
        $('input#searchSong').val(value);
        $('#search-holder').text('');
        if (timer) {
            window.clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            var nameQuery = new AV.Query('Song');
            nameQuery.contains('name', value);
            var singerQuery = new AV.Query('Song');
            singerQuery.contains('singer', value);
            var albumQuery = new AV.Query('Song');
            albumQuery.contains('album', value);
            var desQuery = new AV.Query('Song');
            desQuery.contains('des', value);
            var query = AV.Query.or(nameQuery, singerQuery, albumQuery, desQuery);
            query.find().then(function (results) {
                if (results.length === 0) {
                    $('#matchSongList').empty();
                    $('#matchTitle').text('');
                    var p = '<p>\u6682\u65E0\u641C\u7D22\u7ED3\u679C</p>';
                    _matchSongList.insertAdjacentHTML('beforeend', p);
                } else {
                    $('#matchSongList').empty();
                    for (var i = 0; i < results.length; i++) {
                        var song = results[i].attributes;
                        var div = '<a href=/yunMusic-demo/play.html?id=' + results[i].id + ' class="songInfo">\n                    <p class="songTitle">' + song.name + '<span class="songDesc">' + song.des + '</span></p>\n                    <p class="singer"><i class="icon icon-sq"></i>' + song.singer + ' - ' + song.album + '</p>\n                    <div class="playButton"><i class="icon icon-play"></i></div>\n                    </a>';
                        _matchSongList.insertAdjacentHTML('beforeend', div);
                    }
                }
            });
        }, 350);
    }
}

$('#searchEmpty').on('click', function () {
    $('input#searchSong').val('');
    $('#search-holder').text('搜索歌曲、歌手、专辑');
    $('#searchTips').removeClass('hide');
    $('#searchEmpty').addClass('hide');
    $('#searchResults').addClass('hide');
    $('.resultMatch').addClass('hide');
});

// 添加歌曲数据库API
// var Song = AV.Object.extend('Song');
// var song = new Song();
// song.save({
//     name: "Hotel California",
//     des:"",
//     singer:"Eagles",
//     album:"Hell Freezes Over (Live)",
//     url:"http://oval41e32.bkt.clouddn.com/Hotel%20California.mp3",
//     image:"https://i.loli.net/2017/08/31/59a8178ecc142.jpg"
// }).then(function(object) {
//     alert('保存成功');
// });

