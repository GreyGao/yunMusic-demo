$('.tabs').on('click','.tabs-main',function (e) {
    let $li = $(e.currentTarget);
    let index = $li.index();
    console.log('dianle');
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


// 添加数据库部分
// var Song = AV.Object.extend('Song');    //选择表名
// var song = new Song();                  //创建一个实例
// song.save({                             //数据内容信息
//     name: "おとなの掟",
//     des:"（成人法则）",
//     singer:"Doughnuts Hole",
//     album:"おとなの掟",
//     url:"http://oval41e32.bkt.clouddn.com/%E6%88%90%E4%BA%BA%E6%B3%95%E5%88%99.mp3"
// }).then(function(object) {
//     alert('保存成功');
// });

let newSongsList = document.querySelector('#newSongsList');
let query = new AV.Query('Song');
query.find().then(function (results) {
    $('#loading-music').remove();
    console.log(results.length);
    for(let i=0; i<results.length;i++){
        let song = results[i].attributes;
        console.log(song);
        let li =
            `<a href=${song.url} class="songInfo">
                    <p class="songTitle">${song.name}<span class="songDesc">${song.des}</span></p>
                    <p class="singer"><i class="icon icon-sq"></i>${song.singer} - ${song.album}</p>
                    <div class="playButton"><i class="icon icon-play"></i></div>
             </a>`;
        console.log(li);
    newSongsList.insertAdjacentHTML('beforeend', li)
    }
}, function (error) {
    alert('获取歌曲失败')
});
