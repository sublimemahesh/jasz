<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$products = Product::getProductsBySubCategory($json);

$feedData = json_encode($products);

echo '{"feedData":' . $feedData . '}';
