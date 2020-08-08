<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$prod_arr = array();
$arr = array();
foreach($json as $item) {
    $products = Product::getDetailsByID($item['id']);
    if ($products) {
        $arr['product'] = $products;
        $arr['qty'] = $item['qty'];
        array_push($prod_arr, $arr);
    }
}
$feedData = json_encode($prod_arr);

echo '{"feedData":' . $feedData . '}';
