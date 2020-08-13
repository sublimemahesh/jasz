<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$offers = Offer::getAllWithOutThisID($json);

$feedData = json_encode($offers);

echo '{"feedData":' . $feedData . '}';
