function songSearch(){
    /*------------------------主功能部分------------------------*/
    // input内容事件
    $('input#searchSong')
        .bind('input',function (e) {
            inputChange(e)})
        .bind('focus',function (e) {
            inputChange(e)})
        .bind('keypress',function (e) {
            searchSubmit(e)});
    // input清空
    $('#searchClose').on('click',function () {
        clearSearch();
        $('input#searchSong').val('');
        $('.resultMatch').addClass('hide');
    });
    // 热门标签跳转
    $('#hotSearchList').on('click','li',function (e) {
        let value = $(e.currentTarget).text().trim();
        matchSongList(value)
    });
    // 搜索结果显示
    function inputChange(e) {
        onSearch();
        throttle(e,350,searchInput);
    }
    //最佳匹配结果显示
    function searchSubmit(e){
        $('#searchResults').addClass('hide');
        let value = $(e.currentTarget).val();
        matchSongList(value);
    }
    // 函数节流
    let timer = null;
    function throttle(value,time,fn) {
        if(timer){window.clearTimeout(timer)}
        timer = setTimeout(function () {
            timer = null;
            fn(value)
        },time)
    }

    /*---------------------依赖函数部分----------------------*/
    function searchInput(e) {
        let value = $(e.currentTarget).val();
        if (value.length === 0) {
            clearSearch()
        } else {
            $('#searchLink').text(`搜索"${value}"`);
            searchSongs(value).then(fillSearchResults);
        }
    }
    function searchSongs(value) {
        let nameQuery = new AV.Query('Song');
        nameQuery.contains('name', value);
        let singerQuery = new AV.Query('Song');
        singerQuery.contains('singer', value);
        let albumQuery = new AV.Query('Song');
        albumQuery.contains('album', value);
        let desQuery = new AV.Query('Song');
        desQuery.contains('des', value);
        let query = AV.Query.or(nameQuery, singerQuery, albumQuery, desQuery);
        return query.find()
    }
    function fillSearchResults(results) {
        $('#resultList').empty();
        if (results.length === 0) {
            let li = `<a class="resultSong"><i class="svg svg-search"></i><span>没有结果</span></a>`;
            $("#resultList").append(li);
        } else {
            for (let i = 0; i < results.length; i++) {
                let song = results[i].attributes;
                let li = searchTemplate(song,results[i].id);
                $("#resultList").append(li);
            }
        }
    }
    function clearSearch() {
        $('#search-holder').text('搜索歌曲、歌手、专辑');
        $('#searchClose').addClass('hide');
        $('#searchTips').removeClass('hide');
        $('#searchResults').addClass('hide');
        $('#resultList').empty();
        $('#matchSongList').empty();
    }
    function onSearch() {
        $('#search-holder').text('');
        $('#searchClose').removeClass('hide');
        $('#searchTips').addClass('hide');
        $('.resultMatch').addClass('hide');
        $('#searchResults').removeClass('hide');
    }
    function matchSongList(value) {
        onMatch();
        if (value.length != 0) {
            $('input#searchSong').val(value);
            $('#search-holder').text('');
            throttle(value,350,function (value) {
                searchSongs(value).then(fillSongs)
            })
        }
    }
    function onMatch() {
        $('.resultMatch').removeClass('hide');
        $('#searchTips').addClass('hide');
    }
    function fillSongs(results) {
        $('#matchSongList').empty();
        if (results.length === 0) {
            $('#matchTitle').text('');
            let p = `<p>暂无搜索结果</p>`;
            $("#matchSongList").append(p);
        } else {
            for (let i = 0; i < results.length; i++) {
                let song = results[i].attributes;
                let div =songTemplate(song,results[i].id);
                $("#matchSongList").append(div);
            }
        }
    }
    function searchTemplate(song,id){
        return `
                <a href=/yunMusic-demo/play.html?id=${id} class="resultSong">
                <i class="svg svg-search"></i><span>${song.name} - ${song.singer}</span></a>
                `
    }
    function songTemplate(song,id) {
        return `<a href=/yunMusic-demo/play.html?id=${id} class="songInfo">
                    <p class="songTitle">${song.name}<span class="songDesc">${song.des}</span></p>
                    <p class="singer"><i class="icon icon-sq"></i>${song.singer} - ${song.album}</p>
                    <div class="playButton"><i class="icon icon-play"></i></div>
                    </a>`
    }
}

songSearch();