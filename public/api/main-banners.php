<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$banners = OfferBanner::getAll();
$feedData = json_encode($banners);

echo '{"feedData":' . $feedData . '}';
