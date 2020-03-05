<?php

include_once(dirname(__FILE__) . '../../class/include.php');

$json = json_decode(file_get_contents('php://input'), true);

$subcategories = SubCategory::getSubCategoriesyByCategory($json);

$feedData = json_encode($subcategories);

echo '{"feedData":' . $feedData . '}';