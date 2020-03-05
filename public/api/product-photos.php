<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$photos = ProductPhoto::getPhotosByProduct($json);
$feedData = json_encode($photos);

echo '{"feedData":' . $feedData . '}';
