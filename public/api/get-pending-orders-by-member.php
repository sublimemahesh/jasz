<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$orders = Order::getOrdersByDeliveryStatusAndMember($json, 0);

$feedData = json_encode($orders);

echo '{"feedData":' . $feedData . '}';
