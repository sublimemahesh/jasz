<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$categories = Category::getAll();

$feedData = json_encode($categories);

echo '{"feedData":' . $feedData . '}';
