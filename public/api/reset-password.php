<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$MEMBER = new Member(NULL);

    $code = $json["resetCode"];
    $password = $json["newPW"];
    $confpassword = $json["confirmPW"];



        if ($MEMBER->SelectResetCode($code)) {

            $MEMBER->updatePassword($password, $code);

            $result = 'success';
        } else {
            $result = 'Please enter correct reset code';
        }
    

$feedData = json_encode($result);

echo '{"feedData":' . $feedData . '}';
