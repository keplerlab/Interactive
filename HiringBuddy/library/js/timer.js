var timer = ( function () {

    var minutesLabel = document.getElementById("minutes")
    , secondsLabel = document.getElementById("seconds")
    , totalSeconds = 0
    , totalMinutes = 60;

    function initTimer () {

        minutesLabel.innerHTML = totalMinutes;
    }

    function runTimer () {

        setInterval( setTime, 1000 );
    }

    function setTime () {

      --totalSeconds;
      secondsLabel.innerHTML = 60 - pad( totalSeconds % 60 );

      if ( totalMinutes ) {

        minutesLabel.innerHTML = totalMinutes -  1 - pad( parseInt( totalSeconds / 60 ) );

      } else {

        alert ('You ran out of time!');

      }

    }

    function pad ( val ) {

        var valString = Math.abs( val ) + "";

        if( valString.length < 2 ){

            return "0" + valString;

        } else {
           return valString; 
        }

    }

    return {
        init : initTimer,
        start : runTimer
    };

} ) ();