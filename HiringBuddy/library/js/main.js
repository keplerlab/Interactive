var candidateName = 'Brameshmadhav S';
var fieldsetStr = '';

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
    $.get('questions.json','', function ( dataStr ) {
        var data = JSON.parse(dataStr);
        for (var i = 0; i < data.questions.length; i++) {
            var questionObj = data.questions[i];
            fieldsetStr += "<fieldset>"
              + "<legend>Question " + (i + 1) + " :</legend>"
              + "<div>" + questionObj.question + "</div>"
              ;
              for (var j = 0; j < questionObj['answer-choices'].length; j++) {
                  var answerChoice = questionObj['answer-choices'][j];
                  fieldsetStr += "<div>" + "<input class= 'answerChoice' type='radio' name='answerChoice' " +  "value='" + j + "'/> " + answerChoice + "</div>";
              };
            fieldsetStr += "</fieldset>";
            ;   
        };
        document.getElementById('questions-fieldset').innerHTML = fieldsetStr;
        $('.questions').show();
        timer.start();
    });
});