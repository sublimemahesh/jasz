<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$order = Order::getDetailsByID($json);
$feedData = json_encode($order);

echo '{"feedData":' . $feedData . '}';
