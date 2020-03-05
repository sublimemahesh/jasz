<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$MEMBER = new Member(NULL);
if ($json) {
    $MEMBER->username = $json['username'];
    $MEMBER->password = $json['password'];

    $result = $MEMBER->login();
    
//    dd($_SESSION['id']);
    $feedData = json_encode($result);

    echo '{"feedData":' . $feedData . '}';
}
