require.config({
    baseUrl: "src",
    paths: {
        avInit:'../vendors/av-min',
        jquery:"../vendors/jquery.min",
        loaders:"../vendors/loaders.css"
    }
});

requirejs(["avReset","loadSongs","searchSongs","tabs"], function(avReset,loadSongs,searchSongs,tabs) {
    avReset();
    tabs(".tabs",".mainPages");
    loadSongs();
    searchSongs()
});