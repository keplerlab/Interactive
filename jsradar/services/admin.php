<?php
    //Pick the post data
    $postdata = file_get_contents("php://input");
    //Convert json to Array
    $postArr = json_decode($postdata);
    // Read the existing moderation pending data from file
    $inp = file_get_contents('moderatedDataLog.json');
    //Convert json to Array
    $tempArray = json_decode($inp);
    if(empty ( $tempArray)){
        $tempArray = array();
    }
    // Pusg the object to the array
    array_push($tempArray, $postArr);
    // convert back to json
    $jsonData = json_encode($tempArray);
    // write back to file
    file_put_contents('moderatedDataLog.json', $jsonData);
?>