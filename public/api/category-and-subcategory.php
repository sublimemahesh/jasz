<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$categories = Category::getAll();
$subcat_arr = array();
$cat_arr = array();
$arr = array();
foreach ($categories as $category) {

    $subcategories = SubCategory::getSubCategoriesyByCategory($category['id']);
        $arr['cat_id'] = $category['id'];
        $arr['cat_name'] = $category['name'];
        $arr['have_sub'] = $category['have_sub'];
        $arr['subcategories'] = $subcategories;
        array_push($subcat_arr, $arr);
    
}

$feedData = json_encode($subcat_arr);

echo '{"feedData":' . $feedData . '}';
