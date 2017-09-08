export default function loadSongs() {
    getSongs().then(fillSongs, function (error) {
        alert('获取歌曲失败' + error);
    });
    function getSongs() {
        let query = new AV.Query('Song');
        return query.find()
    }

    function fillSongs(results) {
        $('#loading-music').remove();
        for (let i = 0; i < results.length; i++) {
            let song = results[i].attributes;
            let li = songTemplate(song, results[i].id);
            $("#newSongsList").append(li);
            $("#hotSongsList").append(li);
        }
    }

    function songTemplate(song, id) {
        return `
            <a href=/yunMusic-demo/play.html?id=${id} class="songInfo">
                    <p class="songTitle">${song.name}<span class="songDesc">${song.des}</span></p>
                    <p class="singer"><i class="icon icon-sq"></i>${song.singer} - ${song.album}</p>
                    <div class="playButton"><i class="icon icon-play"></i></div>
             </a>
        `;
    }

}
