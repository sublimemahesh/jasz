<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$result = Member::authenticate($json['id'], $json['authToken']);

$feedData = json_encode($result);

echo '{"feedData":' . $result . '}';
