var app = require( 'app' );
var BrowserWindow = require( 'browser-window' );
app.on( 'ready', function () {
    var mainWindow = new BrowserWindow ({
        width: 800,
        height:600,
        'always-on-top': true
    });
    mainWindow.setFullScreen( true );
    mainWindow.setResizable( false );
    
    //events 
    // mainWindow.on('devtools-opened', function(){
    //     setTimeout( function () {
    //         mainWindow.closeDevTools();
    //     }, 100 );
    // });

    mainWindow.on('resize', function() {
        mainWindow.close();
    });

    mainWindow.loadUrl( 'file://' + __dirname + '/index.html' );
});