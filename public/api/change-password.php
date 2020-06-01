<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$result = Member::checkOldPass($json['member'], $json['currentpw']);

if($result) {
    $result1 = Member::changePassword($json['member'], $json['newpw']);
    $feedData = json_encode($result1);
} else {
    $feedData = json_encode('not_matched');
}


echo '{"feedData":' . $feedData . '}';
