<?php
    //Pick the post data
    $postdata = file_get_contents("php://input");
    // write back to file
    file_put_contents('data.json', $postdata);
?>