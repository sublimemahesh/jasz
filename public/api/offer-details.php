<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$offer = Offer::getDetailsByID($json);
$feedData = json_encode($offer);

echo '{"feedData":' . $feedData . '}';
