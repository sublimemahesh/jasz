<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$subcat = SubCategory::getDetailsByID($json);
$feedData = json_encode($subcat);

echo '{"feedData":' . $feedData . '}';
