<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$MEMBER = new Member(NULL);
if ($json) {
    $checkEmail = $MEMBER->checkEmail($json['email']);
    if (!$checkEmail) {
        $MEMBER->fullName = $json['fullname'];
        $MEMBER->email = $json['email'];
        $MEMBER->username = $json['username'];
        $MEMBER->password = $json['password'];

        $result = $MEMBER->create();
        if ($result) {

            $data = $MEMBER->login($MEMBER->email, $MEMBER->password);
            $feedData = json_encode($data);
            echo '{"feedData":' . $feedData . '}';
        } else {
            $feedData = json_encode(["status" => 'error1']);
            echo '{"feedData":' . $feedData . '}';
        }
    } else {
        $feedData = json_encode(["status" => 'error']);
        echo '{"feedData":' . $feedData . '}';
    }
}
