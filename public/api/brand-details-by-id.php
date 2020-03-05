<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$brand = Brand::getDetailsByID($json);
$feedData = json_encode($brand);

echo '{"feedData":' . $feedData . '}';
