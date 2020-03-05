<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$comments = Comments::getAll();
$feedData = json_encode($comments);

echo '{"feedData":' . $feedData . '}';