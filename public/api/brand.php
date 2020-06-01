<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$brands = Brand::getAll();
$feedData = json_encode($brands);

echo '{"feedData":' . $feedData . '}';
