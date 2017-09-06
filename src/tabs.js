define(["jquery"],function ($) {
    function tabs(tabSelector,pageSelector) {
        $(tabSelector).on('click','li',function (e) {
            let $li = $(e.currentTarget);
            let index = $li.index();
            pageGo(index)
        });
        function pageGo(index){
            $(`${tabSelector}>li`).eq(index).addClass('active')
                .siblings().removeClass('active');
            $(`${pageSelector}>div`).eq(index).addClass('active')
                .siblings().removeClass('active')
        }
    }
    return tabs
})





