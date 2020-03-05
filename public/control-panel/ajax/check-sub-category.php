<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if ($_POST['option'] == 'checksub') {
    $CATEGORY = new Category($_POST['id']);

    if ($CATEGORY->haveSub == 1) {

        $SUB_CATEGORY = new SubCategory(NULL);
        $arr = $SUB_CATEGORY->getAllSubCategoryByCategory($CATEGORY->id);
        $data = array("status" => 'true', "arr" => $arr);
        echo json_encode($data);
    } else {
        $data = array("status" => 'false');
        header('Content-type: application/json');
        echo json_encode($data);
    }
}