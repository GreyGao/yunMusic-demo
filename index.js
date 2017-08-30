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
var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// 歌单列表获取
let newSongsList = document.querySelector('#newSongsList');
let query = new AV.Query('Song');
query.find().then(function (results) {
    $('#loading-music').remove();
    for(let i=0; i<results.length;i++){
        let song = results[i].attributes;
        let li =
            `<a href=${song.url} class="songInfo">
                    <p class="songTitle">${song.name}<span class="songDesc">${song.des}</span></p>
                    <p class="singer"><i class="icon icon-sq"></i>${song.singer} - ${song.album}</p>
                    <div class="playButton"><i class="icon icon-play"></i></div>
             </a>`;
    newSongsList.insertAdjacentHTML('beforeend', li)
    }
}, function (error) {
    alert('获取歌曲失败')
});

// 歌曲搜索
let resultList = document.querySelector('#resultList');
$('input#searchSong').on('input',function (e) {

    let $input = $(e.currentTarget);
    let value = $input.val().trim();
    let query = new AV.Query('Song');
  // query.contains('name',value);
    query.contains('des',value);

    if(value.length === 0){
        $('#searchTips').removeClass('hide');
        $('#searchResults').addClass('hide');
        $('#search-holder').text('搜索歌曲、歌手、专辑');

    }else{
        $('#searchTips').addClass('hide');
        $('#search-holder').text('');
        query.find().then(function (results) {
            $('#resultList').empty();
            if (results.length === 0) {
                let li =     `
                <li class="resultSong"><i class="svg svg-search"></i><span>没有结果</span></li>
                `;
                resultList.insertAdjacentHTML('beforeend', li)
            } else {
                for (let i = 0; i < results.length; i++) {
                    let song = results[i].attributes;
                    let li =
                        `
                <li class="resultSong"><i class="svg svg-search"></i><span>${song.name} - ${song.singer}</span></li>
                `;
                    resultList.insertAdjacentHTML('beforeend', li)
                }
            }
        });
        $('#searchResults').removeClass('hide');
        $('#searchLink').text(`搜索"${value}"`)
    }


});


// 添加歌曲数据库API
// var Song = AV.Object.extend('Song');    //选择表名
// var song = new Song();                  //创建一个实例
// song.save({                             //数据内容信息
//     name: "Calling to The Night",
//     des:"",
//     singer:"Natasha Farrow",
//     album:"METAL GEAR SOLID VOCAL TRACKS",
//     url:"http://oval41e32.bkt.clouddn.com/Calling%20to%20The%20Night.mp3"
// }).then(function(object) {
//     alert('保存成功');
// });