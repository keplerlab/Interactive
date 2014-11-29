<?php
    //Pick the post data
    $postdata = file_get_contents("php://input");
    //Convert json to Array
    $postArr = json_decode($postdata);
    // Read the existing moderation pending data from file
    $inp = file_get_contents('moderationPending.json');
    //Convert json to Array
    $tempArray = json_decode($inp);
    // Merges the 2 arrays and picks out the unique values only, SORT_REGULAR is used to convert object as string. Array values will return a json compatible array as array can also be a map in PHP! Darn!
    $tempArray = array_values(array_unique(array_merge($tempArray, $postArr), SORT_REGULAR ));
    // convert back to json
    $jsonData = json_encode($tempArray);
    // write back to file
    file_put_contents('moderationPending.json', $jsonData);
?>