<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$products = Product::getProductsByCategoryWithRandom($json['product'],$json['category']);
$feedData = json_encode($products);

echo '{"feedData":' . $feedData . '}';
