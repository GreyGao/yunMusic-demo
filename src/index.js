//主页面Tabs切换
$('.tabs').on('click','.tabs-main',function (e) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    pageGo(index)
});

function pageGo(index){
    $('.tabs-main').eq(index).addClass('active')
        .siblings().removeClass('active');
    $('.mainPage').eq(index).addClass('active')
        .siblings().removeClass('active')
}

// leanCloud 初始化
!function (){
    var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
    var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}();

// 歌曲搜索
let resultList = document.querySelector('#resultList');
$('input#searchSong').bind('input',function (e) {
    inputChange(e)
}).bind('focus',function (e) {
    inputChange(e)
}).bind('keypress',function (e) {
    searchSubmit(e)
});

$('#hotSearchList').on('click','li',function (e) {
    hotSongLink(e)
});

let timer = null;

function inputChange(e) {
    $('.resultMatch').addClass('hide');
    $('#searchResults').addClass('hide');
    $('#search-holder').text('');
    $('#searchEmpty').removeClass('hide');
    if(timer){window.clearTimeout(timer)}
    timer = setTimeout(function () {
        timer = null;
        let $input = $(e.currentTarget);
        let value = $input.val();
        let nameQuery = new AV.Query('Song');
        nameQuery.contains('name', value);
        let singerQuery = new AV.Query('Song');
        singerQuery.contains('singer', value);
        let albumQuery = new AV.Query('Song');
        albumQuery.contains('album', value);
        let desQuery = new AV.Query('Song');
        desQuery.contains('des', value);
        let query = AV.Query.or(nameQuery, singerQuery, albumQuery, desQuery);
        if (value.length === 0) {
            $('#search-holder').text('搜索歌曲、歌手、专辑');
            $('#searchTips').removeClass('hide');
            $('#searchEmpty').addClass('hide')
        } else {
            $('#searchResults').removeClass('hide');
            $('#searchLink').text(`搜索"${value}"`);
            $('#searchTips').addClass('hide');
            $('#resultList').empty();

            query.find().then(function (results) {
                $('#resultList').empty();
                if (results.length === 0) {
                    let li = `
                <a class="resultSong"><i class="svg svg-search"></i><span>没有结果</span></a>
                `;
                    resultList.insertAdjacentHTML('beforeend', li)
                } else {
                    for (let i = 0; i < results.length; i++) {
                        let song = results[i].attributes;
                        let li =
                            `
                <a href=/yunMusic-demo/play.html?id=${results[i].id} class="resultSong">
                <i class="svg svg-search"></i><span>${song.name} - ${song.singer}</span></a>
                `;
                        resultList.insertAdjacentHTML('beforeend', li)
                    }
                }
            });

        }
    }, 350)
}

function hotSongLink(e) {
    let $li = $(e.currentTarget);
    let value = $li.text().trim();
    matchSongList(value)
}

function searchSubmit(e){
    let $input = $(e.currentTarget);
    let value = $input.val();
    matchSongList(value);
    $('#searchResults').addClass('hide')
}

function matchSongList(value) {
    if (value.length != 0) {
        $('.resultMatch').removeClass('hide');
        $('#searchTips').addClass('hide');
        let matchSongList = document.querySelector('#matchSongList');
        $('input#searchSong').val(value);
        $('#search-holder').text('');
        if(timer){window.clearTimeout(timer)}
        timer = setTimeout(function () {
            timer = null;
        let nameQuery = new AV.Query('Song');
        nameQuery.contains('name', value);
        let singerQuery = new AV.Query('Song');
        singerQuery.contains('singer', value);
        let albumQuery = new AV.Query('Song');
        albumQuery.contains('album', value);
        let desQuery = new AV.Query('Song');
        desQuery.contains('des', value);
        let query = AV.Query.or(nameQuery, singerQuery, albumQuery, desQuery);
        query.find().then(function (results) {
            if (results.length === 0) {
                $('#matchSongList').empty();
                $('#matchTitle').text('');
                let p = `<p>暂无搜索结果</p>`;
                matchSongList.insertAdjacentHTML('beforeend', p)
            } else {
                $('#matchSongList').empty();
                for (let i = 0; i < results.length; i++) {
                    let song = results[i].attributes;
                    let div =
                        `<a href=/yunMusic-demo/play.html?id=${results[i].id} class="songInfo">
                    <p class="songTitle">${song.name}<span class="songDesc">${song.des}</span></p>
                    <p class="singer"><i class="icon icon-sq"></i>${song.singer} - ${song.album}</p>
                    <div class="playButton"><i class="icon icon-play"></i></div>
                    </a>`;
                    matchSongList.insertAdjacentHTML('beforeend', div)
                }
            }
        })
        }, 350)
    }
}

$('#searchEmpty').on('click',function () {
    $('input#searchSong').val('');
    $('#search-holder').text('搜索歌曲、歌手、专辑');
    $('#searchTips').removeClass('hide');
    $('#searchEmpty').addClass('hide');
    $('#searchResults').addClass('hide')
    $('.resultMatch').addClass('hide');
});

