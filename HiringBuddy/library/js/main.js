var candidateName = 'Brameshmadhav S'
// var timer = require('./library/timer.js');
$('#identity-submit').on('click',function(){
    $('.id-field').html('Welcome ' + candidateName );
    setTimeout(function(){
        $('.identity').hide();
        $('.instructions').show(250);
        $('.candidate-name').html(candidateName);
    },500);
});

$('#instructions-submit').on('click',function(){
    $('.instructions').hide();
    $('.questions').show();
    timer.start();
});