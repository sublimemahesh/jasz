<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);


if ($json) {
    $MEMBER = new Member($json['member']);
    
    $MEMBER->fullName = $json['fullname'];
    $MEMBER->email = $json['email'];
    $MEMBER->contactNumber = $json['contactno'];
    $MEMBER->address = $json['address'];
    $MEMBER->city = $json['city'];
    $MEMBER->country = $json['country'];

    $result = $MEMBER->update();
    
    $feedData = json_encode($result);
    echo '{"feedData":' . $result . '}';
}