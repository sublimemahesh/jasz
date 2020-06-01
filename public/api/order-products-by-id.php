<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);
$order_products = OrderProduct::getOrderProductsById($json);

$arr = array();
$pro_arr = array();
foreach ($order_products as $product) {
    $pro = Product::getDetailsByID($product['product']);
        $arr['id'] = $product['id'];
        $arr['product_name'] = $pro['name'];
        $arr['qty'] = $product['qty'];
        $arr['amount'] = $product['amount'];
        
    array_push($pro_arr, $arr);
}

$feedData = json_encode($pro_arr);

echo '{"feedData":' . $feedData . '}';
