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

// 初始化
!function (){
    var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
    var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}();



