<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$categories = Category::getAll();
$prod_arr = array();
$cat_arr = array();
$arr = array();
foreach ($categories as $category) {

    $products = Product::getProductsByCategory($category['id']);
    if ($products) {
        $arr['cat_id'] = $category['id'];
        $arr['cat_name'] = $category['name'];
        $arr['cat_banner'] = $category['banner'];
        $arr['cat_products'] = $products;
        array_push($cat_arr, $arr);
    }
}

$feedData = json_encode($cat_arr);

echo '{"feedData":' . $feedData . '}';
