require.config({
    paths: {
        jquery: 'vendors/jquery.min.js',
        av:'vendors/av-min.js'
    }
});

requirejs(["tabs"], function(tabs) {
    var APP_ID = 'zKM1TH8kc8MSMoh0pd6NcUYY-gzGzoHsz';
    var APP_KEY = 'SutiQq6E6jY1WAwkDOgK4RpB';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    tabs('.tabs','.mainPages');
});