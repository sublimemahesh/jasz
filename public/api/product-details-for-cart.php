<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$prod_arr = array();
foreach($json as $item) {
    $products = Product::getDetailsByID($item);
    if ($products) {
        array_push($prod_arr, $products);
    }
}
$feedData = json_encode($prod_arr);

echo '{"feedData":' . $feedData . '}';
