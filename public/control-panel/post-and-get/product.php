<?php

include_once(dirname(__FILE__) . '/../../class/include.php');

if (isset($_POST['create'])) {
    $PRODUCT = new Product(NULL);
    $VALID = new Validator();
   
    $PRODUCT->category = $_POST['category'];
    $PRODUCT->sub_category = $_POST['sub_category'];
    $PRODUCT->brand = $_POST['brand'];
    $PRODUCT->name = $_POST['name'];
    $PRODUCT->short_description = $_POST['short_description'];
    $PRODUCT->description = $_POST['description'];
    $PRODUCT->price = $_POST['price'];
    $PRODUCT->discount = $_POST['discount'];
    $PRODUCT->shipping_fee = $_POST['shipping_fee'];
    $PRODUCT->isFeaturedProduct = $_POST['featured_product'];
    $PRODUCT->isActive = 1;
    $PRODUCT->queue = 0;
    
    $dir_dest = '../../upload/product/';
    $dir_dest1 = '../../upload/product/';
    $dir_dest_thumb = '../../upload/product/thumb/';
    $dir_dest_thumb1 = '../../upload/product/thumb1/';

    $handle = new Upload($_FILES['image']);
    $handle1 = new Upload($_FILES['image2']);

    $imgName = null;
    $imgName1 = null;
    $img = Helper::randamId();
    $img1 = Helper::randamId();

    if ($handle->uploaded) {
        
        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 450;
        $handle->image_y = 450;
        
        $handle->Process($dir_dest);
        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }

        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 370;
        $handle->image_y = 270;
        $handle->Process($dir_dest_thumb);
        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
        $handle->image_resize = true;
        $handle->file_new_name_ext = 'jpg';
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 126;
        $handle->image_y = 150;
        $handle->Process($dir_dest_thumb1);
        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $imgName = $handle->file_dst_name;
        }
    }
    if ($handle1->uploaded) {
        
        $handle1->image_resize = true;
        $handle1->file_new_name_ext = 'jpg';
        $handle1->image_ratio_crop = 'C';
        $handle1->file_new_name_body = $img1;
        $handle1->image_x = 450;
        $handle1->image_y = 450;
        
        $handle1->Process($dir_dest1);
        if ($handle1->processed) {
            $info = getimagesize($handle1->file_dst_pathname);
            $imgName1 = $handle1->file_dst_name;
        }
    }

    $PRODUCT->image_name = $imgName;
    $PRODUCT->image_name2 = $imgName1;
    $VALID->check($PRODUCT, [
        'category' => ['required' => TRUE],
        'brand' => ['required' => TRUE],
        'name' => ['required' => TRUE],
        'short_description' => ['required' => TRUE],
        'description' => ['required' => TRUE],
        'price' => ['required' => TRUE],
        'discount' => ['required' => TRUE],
        'image_name' => ['required' => TRUE],
        'image_name2' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {

        $PRODUCT->create();
        if (!isset($_SESSION)) {
            session_start();
        }

        $VALID->addError("Your data was saved successfully", 'success');
        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {

        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}

if (isset($_POST['update'])) {

    $dir_dest = '../../upload/product/';
    $dir_dest1 = '../../upload/product/';
    $dir_dest_thumb = '../../upload/product/thumb/';
    $dir_dest_thumb1 = '../../upload/product/thumb1/';

    $handle = new Upload($_FILES['image']);
    $handle1 = new Upload($_FILES['image2']);
    $img = $_POST ["oldImageName"];
    $img1 = $_POST ["oldImageName2"];

    if ($handle->uploaded) {
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 450;
        $handle->image_y = 450;

        $handle->Process($dir_dest);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $img = $handle->file_dst_name;
        }


        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 370;
        $handle->image_y = 270;
        

        $handle->Process($dir_dest_thumb);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $img = $handle->file_dst_name;
        }
        $handle->image_resize = true;
        $handle->file_new_name_body = TRUE;
        $handle->file_overwrite = TRUE;
        $handle->file_new_name_ext = FALSE;
        $handle->image_ratio_crop = 'C';
        $handle->file_new_name_body = $img;
        $handle->image_x = 126;
        $handle->image_y = 150;

        $handle->Process($dir_dest_thumb1);

        if ($handle->processed) {
            $info = getimagesize($handle->file_dst_pathname);
            $img = $handle->file_dst_name;
        }
    }
    if ($handle1->uploaded) {
        $handle1->image_resize = true;
        $handle1->file_new_name_body = TRUE;
        $handle1->file_overwrite = TRUE;
        $handle1->file_new_name_ext = FALSE;
        $handle1->image_ratio_crop = 'C';
        $handle1->file_new_name_body = $img1;
        $handle1->image_x = 450;
        $handle1->image_y = 450;

        $handle1->Process($dir_dest1);

        if ($handle1->processed) {
            $info = getimagesize($handle1->file_dst_pathname);
            $img1 = $handle1->file_dst_name;
        }
    }

    $PRODUCT = new Product($_POST['id']);

    $PRODUCT->image_name = $_POST['oldImageName'];
    $PRODUCT->image_name2 = $_POST['oldImageName2'];
    $PRODUCT->category = $_POST['category'];
    $PRODUCT->sub_category = $_POST['sub_category'];
    $PRODUCT->brand = $_POST['brand'];
    $PRODUCT->name = $_POST['name'];
    $PRODUCT->short_description = $_POST['short_description'];
    $PRODUCT->description = $_POST['description'];
    $PRODUCT->price = $_POST['price'];
    $PRODUCT->discount = $_POST['discount'];
    $PRODUCT->shipping_fee = $_POST['shipping_fee'];
    $PRODUCT->isActive = $_POST['is_active'];
    $PRODUCT->isFeaturedProduct = $_POST['featured_product'];


    $VALID = new Validator();
    $VALID->check($PRODUCT, [
        'category' => ['required' => TRUE],
        'brand' => ['required' => TRUE],
        'name' => ['required' => TRUE],
        'short_description' => ['required' => TRUE],
        'description' => ['required' => TRUE],
        'price' => ['required' => TRUE],
        'image_name' => ['required' => TRUE],
        'image_name2' => ['required' => TRUE]
    ]);

    if ($VALID->passed()) {
        $PRODUCT->update();

        if (!isset($_SESSION)) {
            session_start();
        }
        $VALID->addError("Your changes saved successfully", 'success');
        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    } else {

        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['ERRORS'] = $VALID->errors();

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}
if (isset($_POST['save-data'])) {

    foreach ($_POST['sort'] as $key => $img) {
        $key = $key + 1;

        $PRODUCT = Product::arrange($key, $img);

        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}