<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$category = Category::getDetailsByID($json);
$feedData = json_encode($category);

echo '{"feedData":' . $feedData . '}';
